import { _decorator, CircleCollider2D, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BlackHole')
export class BlackHole extends Component {
    @property(Number)
    public blackHoleDeviationForce:number = 50;

    start() {
        let collider = this.node.getComponent(CircleCollider2D);
        collider.name = 'blackHole'
        collider.apply();
    }

    update(deltaTime: number) {
        
    }
}

