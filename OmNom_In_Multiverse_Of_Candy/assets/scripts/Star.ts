import { _decorator, CircleCollider2D, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Star')
export class Star extends Component {
    start() {
        let collider = this.node.getComponent(CircleCollider2D);
        collider.name = 'star'
        collider.apply();
    }

    update(deltaTime: number) {
        
    }
}

