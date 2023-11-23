import { Animation, CCFloat, CCInteger, CircleCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, PHYSICS_2D_PTM_RATIO, PhysicsSystem2D, Prefab, RigidBody2D, Vec2, Vec3, _decorator, instantiate, randomRangeInt, tween, v2 } from 'cc';
import { BlackHole } from './BlackHole';
import { Game } from './Game';
import { GameManager, GameState } from './GameManager';
import { GravityField } from './GravityField';
import { ItemMovement } from './ItemMovement';
import { LevelMechanicManager } from './LevelMechanics/LevelMechanicManager';
import { PortalMechanic } from './LevelMechanics/PortalMechanic';
const { ccclass, property } = _decorator;

const disappearDuration: number = 0.25;

@ccclass('OmNom')
export class OmNom extends Component {

    @property(Prefab)
    private omNomPrefab: Prefab;
    @property(RigidBody2D)
    private body: RigidBody2D;

    @property(CCInteger)
    private rotationSpeed: number = 10;

    @property(CCFloat)
    private extraExitPortalSpeed: number = 0;

    private rotationDirection: number;

    public gameNode: Node;
    public inPortal: PortalMechanic;

    private blackHoleDeviationToPos: Vec3;
    private blackHoleDeviationRadius: number;
    private blackHoleDeviationForce: number;
    private currentPortal: PortalMechanic;
    private animation: Animation;
    private animationNames:string[] = ["OmNomChewing","OmNomFalling","OmNomDisintegrate","OmNomIdleBubble"]

    private attachedToPlatformMovement: ItemMovement;

    private timeoutIds: number[] = [];

    start() {
        GameManager.eventTarget.on('gameStateChanged', this.onGameStateChanged, this);
    }

    onDestroy() {
        GameManager.eventTarget.off('gameStateChanged', this.onGameStateChanged, this);

        for (let timeoutId of this.timeoutIds) {
            clearTimeout(timeoutId);
        }
    }

    update(deltaTime: number) {
        this.node.angle = (360 + this.node.angle + this.rotationDirection * this.rotationSpeed * deltaTime) % 360;

        if (this.blackHoleDeviationToPos != undefined && this.blackHoleDeviationForce != undefined) {
            var direction = new Vec2(this.blackHoleDeviationToPos.x - this.node.position.x, this.blackHoleDeviationToPos.y - this.node.position.y);
            var directionN = direction.normalize();
            var distance = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
            var devForce = this.blackHoleDeviationForce * (1 - distance / this.blackHoleDeviationRadius);
            this.body.linearVelocity = new Vec2(this.body.linearVelocity.x + directionN.x * devForce * deltaTime,
                this.body.linearVelocity.y + directionN.y * devForce * deltaTime);
        }
        if (this.attachedToPlatformMovement != undefined) {
            this.node.position = new Vec3(this.node.position.x + this.attachedToPlatformMovement.lastMovementAmount.x,
                this.node.position.y + this.attachedToPlatformMovement.lastMovementAmount.y)
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        if (otherCollider.name == 'gravityField') {
            var gravToApply = otherCollider.node.getComponent(GravityField).gravityToApply;
            var currentGrav = PhysicsSystem2D.instance.gravity;
            PhysicsSystem2D.instance.gravity = v2(currentGrav.x + gravToApply.x * PHYSICS_2D_PTM_RATIO, currentGrav.y + gravToApply.y * PHYSICS_2D_PTM_RATIO);
        } else if (otherCollider.name == 'star') {
            GameManager.starsCollected++;
            this.timeoutIds.push(
                setTimeout(function () {
                    otherCollider.node.active = false;
                }.bind(this), 1));
        } else if (otherCollider.name == 'candy') {
            this.animationNames.forEach((c: string) => this.animation.getState(c).stop());
            this.animation.getState("OmNomChewing").play();
            this.timeoutIds.push(
                setTimeout(function () {
                    otherCollider.node.destroy();
                    this.stopInertia();
                    this.blackHoleDeviationToPos = undefined;
                    this.timeoutIds.push(
                        setTimeout(function () {
                            GameManager.setGameState(GameState.LevelCompleted);
                        }.bind(this), 2000));
                }.bind(this), 1));
        } else if (otherCollider.name == 'deathTouch') {
            // Lasers or black hole center
            this.animationNames.forEach((c: string) => this.animation.getState(c).stop());
            this.animation.getState("OmNomDisintegrate").play();
            this.timeoutIds.push(
                setTimeout(function () {
                    this.stopInertia();
                    this.timeoutIds.push(
                        setTimeout(function () {
                            this.gameNode.getComponent(Game).numOmNoms--;
                            tween(this.node.scale).to(0.15, Vec3.ZERO).call(() => this.node.destroy()).start();
                            // this.node.destroy();
                        }.bind(this), 1000));
                }.bind(this), 1));
        } else if (otherCollider.name == 'blackHole') {
            this.animationNames.forEach((c: string) => this.animation.getState(c).stop());
            this.animation.getState("OmNomFalling").play();

            this.blackHoleDeviationForce = otherCollider.node.getComponent(BlackHole).blackHoleDeviationForce;
            this.blackHoleDeviationRadius = otherCollider.node.getComponent(BlackHole).radius;
            this.blackHoleDeviationToPos = otherCollider.node.position;
        } else if (otherCollider.name == 'bounceObstacle') {
            this.attachedToPlatformMovement = otherCollider.node.getComponentInChildren(ItemMovement);
        }

        let portalMechanic = otherCollider.node.getComponent(PortalMechanic);

        if (portalMechanic != null) {
            if (this.inPortal == null || portalMechanic != this.inPortal) {
                this.timeoutIds.push(
                    setTimeout(function () {
                        this.usePortal(portalMechanic);
                    }.bind(this), 1));
            }
        }
    }

    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        if (otherCollider.name == 'gravityField') {
            var gravToApply = otherCollider.node.getComponent(GravityField).gravityToApply;
            var currentGrav = PhysicsSystem2D.instance.gravity;
            PhysicsSystem2D.instance.gravity = v2(currentGrav.x - gravToApply.x * PHYSICS_2D_PTM_RATIO, currentGrav.y - gravToApply.y * PHYSICS_2D_PTM_RATIO);
        } else if (otherCollider.name == 'blackHole') {
            this.blackHoleDeviationForce = undefined;
            this.blackHoleDeviationToPos = undefined;
        } else if (otherCollider.name == 'bounceObstacle') {
            this.attachedToPlatformMovement = undefined;
        }

        let portalMechanic = otherCollider.getComponent(PortalMechanic);

        if (this.inPortal != null && portalMechanic == this.inPortal) {
            this.inPortal = null;
        }
    }

    init() {
        let collider = this.node.getComponent(CircleCollider2D);
        collider.name = 'omnom'
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        collider.apply();
        this.gameNode.getComponent(Game).numOmNoms++;
        this.rotationDirection = randomRangeInt(-1, 2);
        this.animation = this.node.getComponent(Animation);
    }

    setVelocity(velocity: Vec2) {
        this.body.linearVelocity = velocity;
    }

    addVelocity(velocity: Vec2) {
        this.body.applyLinearImpulseToCenter(velocity, true);
    }

    setAngularVelocity(angularVelocity: number) {
        this.body.applyAngularImpulse(angularVelocity, true);
    }

    onGameStateChanged(gameState: GameState) {
        if (gameState == GameState.LevelCompleted) {
            this.body.enabled = false;
        }
    }

    usePortal(portalMechanic: PortalMechanic) {
        this.currentPortal = portalMechanic;
        this.currentPortal.doAnimation();
        this.disappear(portalMechanic.node.worldPosition);
    }

    disappear(targetWorldPosition: Vec3) {
        this.body.enabled = false;
        this.node.getComponent(CircleCollider2D).enabled = false;

        let scaleTween = tween(this.node).to(disappearDuration, { scale: Vec3.ZERO });
        let worldPositionTween = tween(this.node).to(disappearDuration, { worldPosition: targetWorldPosition });

        tween(this.node)
            .parallel(scaleTween, worldPositionTween)
            .call(() => {
                this.doPortalLogic();
            })
            .start();
    }

    doPortalLogic() {
        let connectedPortals = LevelMechanicManager.getConnectedPortals(this.currentPortal);

        for (let i = 0; i < connectedPortals.length; i++) {
            let connectedPortal = connectedPortals[i];

            let omNomInstance = instantiate(this.omNomPrefab);
            omNomInstance.setPosition(connectedPortal.node.position);
            omNomInstance.setParent(this.node.parent);
            let omNom = omNomInstance.getComponent(OmNom);
            omNom.inPortal = connectedPortal;

            let exitVelocity = this.body.linearVelocity;

            if (connectedPortal.isGuidedPortal) {
                let speed = this.body.linearVelocity.length();
                let adjustedVelocity = connectedPortal.node.right.normalize().multiplyScalar(speed);
                exitVelocity = new Vec2(adjustedVelocity.x, adjustedVelocity.y);
            }

            let extraVelocity = exitVelocity.clone().normalize().multiplyScalar(this.extraExitPortalSpeed);
            exitVelocity.add(extraVelocity);

            omNom.setVelocity(exitVelocity);
            omNom.gameNode = this.gameNode;
            omNom.setAngularVelocity(this.body.angularVelocity * 0.5);
            omNom.init();

            connectedPortal.doAnimation();
        }

        this.currentPortal = null;

        this.gameNode.getComponent(Game).numOmNoms--;
        this.node.destroy();
    }

    stopInertia() {
        this.node.getComponent(RigidBody2D).linearVelocity = new Vec2(0, 0);
        this.node.getComponent(RigidBody2D).gravityScale = 0;
    }
}
