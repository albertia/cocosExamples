import { _decorator, BoxCollider2D, Component, Contact2DType, Node, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GravityField')
export class GravityField extends Component {

    @property
    public gravityToApply:Vec2;

    start() {
        let collider = this.node.getComponent(BoxCollider2D);
        collider.name = 'gravityField'
        collider.apply();
    }

    update(deltaTime: number) {
        
    }
}

