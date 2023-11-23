import { CircleCollider2D, Component, Node, Vec3, _decorator, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Candy')
export class Candy extends Component {

    @property(Node)
    private visualsNode: Node;

    start() {
        let collider = this.node.getComponent(CircleCollider2D);
        collider.name = 'candy'
        collider.apply();

        this.visualsNode.setPosition(new Vec3(0, -5, 0));

        tween(this.visualsNode)
            .by(1, { position: new Vec3(0, 10, 0) }, { easing: 'sineInOut' })
            .by(1, { position: new Vec3(0, -10, 0) }, { easing: 'sineInOut' })
            .union()
            .repeatForever()
            .start();
    }
}

