import { _decorator, CCFloat, Collider2D, Component, Contact2DType, IPhysics2DContact } from 'cc';
import { OmNom } from './OmNom';
import { ItemMovement } from './ItemMovement';
const { ccclass, property } = _decorator;

@ccclass('BounceObstacle')
export class BounceObstacle extends Component {

    @property(CCFloat)
    private bounceForce: number = 150;

    @property(Collider2D)
    private collider2D: Collider2D;

    start() {
        this.collider2D.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        if (this.node.getComponentInChildren(ItemMovement) != undefined) {
            this.collider2D.name = 'bounceObstacle';
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        let omNom = otherCollider.getComponent(OmNom);
        if (omNom) {
            omNom.addVelocity(contact.getWorldManifold().normal.multiplyScalar(this.bounceForce));
        }
    }
}


