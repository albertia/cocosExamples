import { _decorator, CCBoolean, Component, NodeEventType, Vec2, Vec3 } from 'cc';
import { GameManager } from '../GameManager';
import { MechanicSelectedEvent } from './MechanicSelectedEvent';
const { ccclass, property } = _decorator;

export enum LevelMechanicColor {
    Blue,
    Green,
    Purple
}

@ccclass('LevelMechanic')
export class LevelMechanic extends Component {

    @property({ type: CCBoolean })
    public canChangeColor: boolean;

    @property({ type: CCBoolean })
    public canRotate: boolean;

    public levelMechanicColor: LevelMechanicColor = LevelMechanicColor.Blue;

    start() {
        this.node.on(NodeEventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(NodeEventType.TOUCH_MOVE, this.onTouchMove, this);

        GameManager.eventTarget.on('gameStateChanged', this.onGameStateChanged, this);

        this.selectMechanic();
    }

    onDestroy() {
        this.node.off(NodeEventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(NodeEventType.TOUCH_MOVE, this.onTouchMove, this);

        GameManager.eventTarget.off('gameStateChanged', this.onGameStateChanged, this);
    }

    onTouchStart() {
        if (GameManager.isInGameplayState) {
            return;
        }

        this.selectMechanic();
    }

    onTouchMove(event) {
        if (GameManager.isInGameplayState) {
            return;
        }

        var uiDelta: Vec2 = event.getUIDelta();
        this.node.position = new Vec3(this.node.position.x + uiDelta.x, this.node.position.y + uiDelta.y);
    }

    onGameStateChanged() { }

    selectMechanic() {
        this.node.dispatchEvent(new MechanicSelectedEvent('mechanicSelected', this, true));
    }

    changeColor() {
        this.levelMechanicColor = (this.levelMechanicColor + 1) % 3;
    }
}


