import { _decorator, Component, director, Node, NodeEventType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ResetButton')
export class ResetButton extends Component {
    start() {
        this.node.on(NodeEventType.TOUCH_END, this.resetLevel, this);
    }

    update(deltaTime: number) {
        
    }

    resetLevel() {
        director.loadScene(director.getScene().name);
    }
}

