import { _decorator, BoxCollider2D, Component, Animation, Node, Vec2 } from 'cc';
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
        var gravityDir = new Vec2(this.gravityToApply).normalize();
        var angleRad = Math.atan2(gravityDir.y, gravityDir.x)- Math.PI/2;
        var angle = (angleRad*180/Math.PI);
        visuals.angle = angle;
    }

    update(deltaTime: number) {
        
    }
}

