import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, director, Game, instantiate, IPhysics2DContact, PHYSICS_2D_PTM_RATIO, PhysicsSystem2D, Prefab, RigidBody2D, v2, Vec2, Vec3 } from 'cc';
import { BlackHole } from './BlackHole';
import { Candy } from './Candy';
import { GravityField } from './GravityField';
import { LevelMechanicManager } from './LevelMechanics/LevelMechanicManager';
import { PortalMechanic } from './LevelMechanics/PortalMechanic';
const { ccclass, property } = _decorator;

@ccclass('OmNom')
export class OmNom extends Component {

    @property(Prefab)
    private omNomPrefab: Prefab;

    @property(RigidBody2D)
    private body: RigidBody2D;

    public starsCollected: number = 0;
    public inPortal: PortalMechanic;

    private blackHoleDeviationToPos: Vec3;
    private blackHoleDeviationRadius: number;
    private blackHoleDeviationForce: number;
    private currentPortal: PortalMechanic;

    start() {
        this.starsCollected = 0;
        let collider = this.node.getComponent(BoxCollider2D);
        collider.name = 'omnom'
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        collider.apply();
    }

    update(deltaTime: number) {
        if (this.currentPortal) {
            let connectedPortals = LevelMechanicManager.getConnectedPortals(this.currentPortal);

            for (let i = 0; i < connectedPortals.length; i++) {

                let portal = connectedPortals[i];
            
                let omNomInstance = instantiate(this.omNomPrefab);
                omNomInstance.setPosition(portal.node.position);
                omNomInstance.setParent(this.node.parent);
                let omNom = omNomInstance.getComponent(OmNom);
                omNom.inPortal = portal;
                omNom.setVelocity(this.body.linearVelocity);
            }

            this.node.destroy();

            this.currentPortal = null;
        }

        if (this.blackHoleDeviationToPos != undefined && this.blackHoleDeviationForce != undefined) {
            var direction =  new Vec2(this.blackHoleDeviationToPos.x - this.node.position.x, this.blackHoleDeviationToPos.y - this.node.position.y);
            var directionN = direction.normalize();
            var distance = Math.sqrt(direction.x*direction.x + direction.y*direction.y);
            var devForce = this.blackHoleDeviationForce* (1 - distance/this.blackHoleDeviationRadius);
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
            this.starsCollected++;
            setTimeout(function () {
                otherCollider.node.destroy();
            }.bind(this), 1);
        } else if (otherCollider.name == 'candy') {
            setTimeout(function () {
                director.loadScene(otherCollider.node.getComponent(Candy).nextScene);
            }.bind(this), 100);
        } else if (otherCollider.name == 'deathTouch') {
            // Lasers or black hole center
            setTimeout(function () {
                director.loadScene(director.getScene().name);
            }.bind(this), 100);
        } else if (otherCollider.name == 'blackHole') {
            this.blackHoleDeviationForce = otherCollider.node.getComponent(BlackHole).blackHoleDeviationForce;
            this.blackHoleDeviationRadius = otherCollider.node.getComponent(BlackHole).radius;
            this.blackHoleDeviationToPos = otherCollider.node.position;
        } else if (otherCollider.node.name == 'RegularPortalMechanic') {
            let portalMechanic = otherCollider.getComponent(PortalMechanic);

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
        } else if (otherCollider.node.name == 'RegularPortalMechanic') {
            let portalMechanic = otherCollider.getComponent(PortalMechanic);

            if (this.inPortal != null && portalMechanic == this.inPortal) {
                this.inPortal = null;
            }
        }
    }

    init() {
        let collider = this.node.getComponent(BoxCollider2D);
        collider.name = 'omnom'
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        collider.apply();
    }

    setVelocity(velocity: Vec2) {
        this.body.linearVelocity = velocity;
    }
}

