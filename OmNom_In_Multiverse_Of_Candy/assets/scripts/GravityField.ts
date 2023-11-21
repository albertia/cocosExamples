import { _decorator, BoxCollider2D, Component, Animation, Node, Vec2, UITransform, Size } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GravityField')
export class GravityField extends Component {

    @property
    public gravityToApply:Vec2;

    start() {
        let collider = this.node.getComponent(BoxCollider2D);
        collider.name = 'gravityField'
        collider.apply();

        var visuals = this.node.getChildByName("Visuals");
        var mask = visuals.getChildByName("Mask");
        var arrows = mask.getChildByName("ArrowsTile");
        var gravityDir = new Vec2(this.gravityToApply).normalize();
        var angleRad = Math.atan2(gravityDir.y, gravityDir.x)- Math.PI/2;
        var angle = ((angleRad*180/Math.PI) + 360) % 360;
        mask.angle = angle;
        if (angle < 95 && angle > 85){
            var arrowsTransform = arrows.getComponent(UITransform);
            arrowsTransform.setContentSize(new Size(arrowsTransform.height, arrowsTransform.width));
        } else if (angle < 275 && angle > 265) {
            var arrowsTransform = arrows.getComponent(UITransform);
            arrowsTransform.setContentSize(new Size(arrowsTransform.height, arrowsTransform.width));
        }
    }

    update(deltaTime: number) {
        
    }
}

