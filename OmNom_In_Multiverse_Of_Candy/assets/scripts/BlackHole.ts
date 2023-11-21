import { _decorator, CircleCollider2D, Component, Node, CCInteger } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BlackHole')
export class BlackHole extends Component {
    @property(CCInteger)
    public blackHoleDeviationForce:number = 50;

    public radius:number;

    start() {
        let collider = this.node.getComponent(CircleCollider2D);
        collider.name = 'blackHole'
        this.radius = collider.radius;
        collider.apply();
    }

    update(deltaTime: number) {
        
    }
}

