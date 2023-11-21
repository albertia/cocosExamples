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

        this.selectMechanic();
    }

    onTouchStart() {
        if (GameManager.didGamePlayStart) {
            return;
        }

        this.selectMechanic();
    }

    onTouchMove(event) {
        if (GameManager.didGamePlayStart) {
            return;
        }

        var uiDelta: Vec2 = event.getUIDelta();
        this.node.position = new Vec3(this.node.position.x + uiDelta.x, this.node.position.y + uiDelta.y);
    }

    selectMechanic() {
        this.node.dispatchEvent(new MechanicSelectedEvent('mechanicSelected', this, true));
    }

    changeColor() {
        this.levelMechanicColor = (this.levelMechanicColor + 1) % 3;
    }
}


