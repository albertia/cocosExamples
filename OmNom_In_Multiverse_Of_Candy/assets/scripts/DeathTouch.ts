import { _decorator, BoxCollider2D, CircleCollider2D, Collider2D, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DeathTouch')
export class DeathTouch extends Component {
    start() {
        let collider:Collider2D = this.node.getComponent(CircleCollider2D);
        if (!collider) {
            collider = this.node.getComponent(BoxCollider2D);
        }
        collider.name = 'deathTouch'
        collider.apply();
    }

    update(deltaTime: number) {
        
    }
}

