import { _decorator, CCBoolean, Component, NodeEventType, Vec2, Vec3 } from 'cc';
import { MechanicSelectedEvent } from './MechanicSelectedEvent';
const { ccclass, property } = _decorator;

@ccclass('LevelMechanic')
export class LevelMechanic extends Component {

    @property({ type: CCBoolean })
    public canChangeColor: boolean;

    @property({ type: CCBoolean })
    public canRotate: boolean;

    start() {
        this.node.on(NodeEventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(NodeEventType.TOUCH_MOVE, this.onTouchMove, this);

        this.selectMechanic();
    }

    update(deltaTime: number) {

    }

    onTouchStart() {
        this.selectMechanic();
    }

    onTouchMove(event) {
        var uiDelta: Vec2 = event.getUIDelta();
        this.node.position = new Vec3(this.node.position.x + uiDelta.x, this.node.position.y + uiDelta.y);
    }

    selectMechanic() {
        this.node.dispatchEvent(new MechanicSelectedEvent('mechanic', this, true));

    }
}


