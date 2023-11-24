import { CCBoolean, CCFloat, Collider2D, Color, Component, Contact2DType, IPhysics2DContact, Node, Sprite, Tween, Vec3, _decorator, tween } from 'cc';
import { ItemMovement } from './ItemMovement';
import { OmNom } from './OmNom';
const { ccclass, property } = _decorator;

@ccclass('BounceObstacle')
export class BounceObstacle extends Component {

    @property(CCBoolean)
    private shouldAddForce: boolean;

    @property(CCFloat)
    private bounceForce: number = 150;

    @property(Collider2D)
    private collider2D: Collider2D;

    @property(CCBoolean)
    private shouldAnimate: boolean = false;

    @property(Node)
    private visualsNode: Node;

    @property(Sprite)
    private sprite: Sprite;

    private animationTween: Tween<Vec3>;

    start() {
        this.collider2D.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        if (this.node.getComponentInChildren(ItemMovement) != undefined) {
            this.collider2D.name = 'bounceObstacle';
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (this.bounceForce <= 0) {
            return;
        }

        let omNom = otherCollider.getComponent(OmNom);
        if (omNom) {

            let bounceForce = contact.getWorldManifold().normal.multiplyScalar(this.bounceForce);

            if (this.shouldAddForce) {
                omNom.addVelocity(bounceForce);
            }
            else {
                omNom.setVelocity(bounceForce);
            }

            this.doAnimation();
        }
    }

    doAnimation() {
        if (!this.shouldAnimate) {
            return;
        }

        if (this.animationTween != null) {
            this.animationTween.stop();
        }

        this.sprite.color = Color.BLUE;

        tween(this.visualsNode.scale)
            .to(0.05, new Vec3(1.2, 1.2, 1))
            .call(() => this.sprite.color = Color.WHITE)
            .to(0.05, Vec3.ONE)

            .start();
    }
}


