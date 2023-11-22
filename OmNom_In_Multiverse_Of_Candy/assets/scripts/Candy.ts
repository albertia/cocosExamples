import { _decorator, CircleCollider2D, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Candy')
export class Candy extends Component {

    start() {
        let collider = this.node.getComponent(CircleCollider2D);
        collider.name = 'candy'
        collider.apply();
    }

    update(deltaTime: number) {

    }
}

