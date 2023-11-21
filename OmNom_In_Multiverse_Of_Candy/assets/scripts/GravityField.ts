import { _decorator, BoxCollider2D, Component, Animation, Node, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GravityField')
export class GravityField extends Component {

    @property
    public gravityToApply:Vec2;

    start() {
        let collider = this.node.getComponentInChildren(BoxCollider2D);
        collider.name = 'gravityField'
        collider.apply();

        let animation = this.node.getComponent(Animation);
        animation.enabled = true;
        animation.play();
    }

    update(deltaTime: number) {
        
    }
}

