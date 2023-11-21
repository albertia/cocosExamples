import { _decorator, Collider2D, Component, Contact2DType, director, instantiate, IPhysics2DContact, PHYSICS_2D_PTM_RATIO, PhysicsSystem2D, Prefab, RigidBody2D, v2, Vec2, Vec3, Node, CircleCollider2D } from 'cc';
import { BlackHole } from './BlackHole';
import { Candy } from './Candy';
import { GravityField } from './GravityField';
import { LevelMechanicManager } from './LevelMechanics/LevelMechanicManager';
import { PortalMechanic } from './LevelMechanics/PortalMechanic';
import { Game } from './Game';
const { ccclass, property } = _decorator;

@ccclass('OmNom')
export class OmNom extends Component {

    @property(Prefab)
    private omNomPrefab: Prefab;
    @property(RigidBody2D)
    private body: RigidBody2D;

    public gameNode: Node;
    public inPortal: PortalMechanic;

    private blackHoleDeviationToPos: Vec3;
    private blackHoleDeviationRadius: number;
    private blackHoleDeviationForce: number;
    private currentPortal: PortalMechanic;

    start() {
    }

    update(deltaTime: number) {
        if (this.currentPortal) {
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

                omNom.setVelocity(exitVelocity);
                omNom.gameNode = this.gameNode;
                omNom.setAngularVelocity(this.body.angularVelocity * 0.5);
                omNom.init();
            }
            this.gameNode.getComponent(Game).numOmNoms--;
            this.node.destroy();

            this.currentPortal = null;
        }

        if (this.blackHoleDeviationToPos != undefined && this.blackHoleDeviationForce != undefined) {
            var direction = new Vec2(this.blackHoleDeviationToPos.x - this.node.position.x, this.blackHoleDeviationToPos.y - this.node.position.y);
            var directionN = direction.normalize();
            var distance = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
            var devForce = this.blackHoleDeviationForce * (1 - distance / this.blackHoleDeviationRadius);
            this.body.linearVelocity = new Vec2(this.body.linearVelocity.x + directionN.x * devForce * deltaTime,
                this.body.linearVelocity.y + directionN.y * devForce * deltaTime);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        if (otherCollider.name == 'gravityField') {
            var gravToApply = otherCollider.node.getComponent(GravityField).gravityToApply;
            var currentGrav = PhysicsSystem2D.instance.gravity;
            PhysicsSystem2D.instance.gravity = v2(currentGrav.x + gravToApply.x * PHYSICS_2D_PTM_RATIO, currentGrav.y + gravToApply.y * PHYSICS_2D_PTM_RATIO);
        } else if (otherCollider.name == 'star') {
            this.gameNode.getComponent(Game).starsCollected++;
            setTimeout(function () {
                otherCollider.node.destroy();
            }.bind(this), 1);
        } else if (otherCollider.name == 'candy') {
            setTimeout(function () {
                otherCollider.node.destroy();
                director.loadScene(otherCollider.node.getComponent(Candy).nextScene);
            }.bind(this), 100);
        } else if (otherCollider.name == 'deathTouch') {
            // Lasers or black hole center
            setTimeout(function () {
                this.gameNode.getComponent(Game).numOmNoms--;
                this.node.destroy();
            }.bind(this), 100);
        } else if (otherCollider.name == 'blackHole') {
            this.blackHoleDeviationForce = otherCollider.node.getComponent(BlackHole).blackHoleDeviationForce;
            this.blackHoleDeviationRadius = otherCollider.node.getComponent(BlackHole).radius;
            this.blackHoleDeviationToPos = otherCollider.node.position;
        }

        let portalMechanic = otherCollider.node.getComponent(PortalMechanic);

        if (portalMechanic != null) {
            if (this.inPortal == null || portalMechanic != this.inPortal) {
                this.currentPortal = portalMechanic;
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
}

