import { _decorator, Component, NodeEventType, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelMechanic')
export class LevelMechanic extends Component {

    private _isDragging: boolean = false;

    start() {
        this.node.on(NodeEventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    update(deltaTime: number) {

    }

    onTouchStart() {

    }

    onTouchMove(event) {
        var uiDelta: Vec2 = event.getUIDelta();
        this.node.position = new Vec3(this.node.position.x + uiDelta.x, this.node.position.y + uiDelta.y);
    }
}


