import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, director, IPhysics2DContact, Node, PHYSICS_2D_PTM_RATIO, PhysicsSystem2D, v2 } from 'cc';
import { GravityField } from './GravityField';
import { Candy } from './Candy';
const { ccclass, property } = _decorator;

@ccclass('OmNom')
export class OmNom extends Component {

    public starsCollected:number = 0;

    start() {
        this.starsCollected = 0;
        let collider = this.node.getComponent(BoxCollider2D);
        collider.name = 'omnom'
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        collider.apply();
    }

    update(deltaTime: number) {
        
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        console.log("CollisionBegin", otherCollider)
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
            console.log("Level END");
            setTimeout(function () {
                director.loadScene(otherCollider.node.getComponent(Candy).nextScene);
              }.bind(this), 100); // 1 sec to allow sound to Finish
        }
    }
    onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        if (otherCollider.name == 'gravityField') {
            var gravToApply = otherCollider.node.getComponent(GravityField).gravityToApply;
            var currentGrav = PhysicsSystem2D.instance.gravity;
            PhysicsSystem2D.instance.gravity = v2(currentGrav.x - gravToApply.x * PHYSICS_2D_PTM_RATIO, currentGrav.y - gravToApply.y * PHYSICS_2D_PTM_RATIO);
        }
    }

    init() {
        let collider = this.node.getComponent(BoxCollider2D);
        collider.name = 'omnom'
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        collider.apply();
    }
}

