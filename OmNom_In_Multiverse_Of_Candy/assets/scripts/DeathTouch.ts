import { _decorator, CircleCollider2D, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DeathTouch')
export class DeathTouch extends Component {
    start() {
        let collider = this.node.getComponent(CircleCollider2D);
        collider.name = 'deathTouch'
        collider.apply();
    }

    update(deltaTime: number) {
        
    }
}

