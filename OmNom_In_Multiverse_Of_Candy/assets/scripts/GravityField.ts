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
        var gravityDir = new Vec2(this.gravityToApply).normalize();
        var angleRad = Math.atan2(gravityDir.y, gravityDir.x)- Math.PI/2;
        var angle = ((angleRad*180/Math.PI) + 360) % 360;
        mask.angle = angle;
        console.log(angle)
        if (angle < 95 && angle > 85){
            var maskTransform = mask.getComponent(UITransform);
            maskTransform.setContentSize(new Size(maskTransform.height, maskTransform.width));
        } else if (angle < 275 && angle > 265) {
            var maskTransform = mask.getComponent(UITransform);
            maskTransform.setContentSize(new Size(maskTransform.height, maskTransform.width));
        }
    }

    update(deltaTime: number) {
        
    }
}

