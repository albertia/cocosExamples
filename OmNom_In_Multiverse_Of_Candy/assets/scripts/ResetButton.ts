import { _decorator, Component, NodeEventType } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('ResetButton')
export class ResetButton extends Component {
    start() {
        this.node.on(NodeEventType.TOUCH_END, this.resetLevel, this);
    }

    resetLevel() {
        GameManager.resetLevel();
    }
}