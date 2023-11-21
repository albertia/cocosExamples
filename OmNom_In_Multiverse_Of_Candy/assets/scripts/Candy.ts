import { _decorator, CCString, CircleCollider2D, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Candy')
export class Candy extends Component {
    @property(CCString)
    public nextScene:string = "";

    start() {
        let collider = this.node.getComponent(CircleCollider2D);
        collider.name = 'candy'
        collider.apply();
    }

    update(deltaTime: number) {
        
    }
}

