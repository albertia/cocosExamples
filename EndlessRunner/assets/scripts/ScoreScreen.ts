import { _decorator, Component, log, Node, RichText, input, Input, EventKeyboard, EventTouch, KeyCode, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreScreen')
export class ScoreScreen extends Component {
    @property(Node)
    public scoreNode:Node;

    start() {
        const scoreNodeComponent = this.scoreNode.getComponent(RichText);
        console.log(scoreNodeComponent, localStorage.getItem("score"))
        scoreNodeComponent.string = JSON.parse(localStorage.getItem("score")).toString() + " points";
    }

    update(deltaTime: number) {
        
    }

    protected onLoad(): void {
        input.on(Input.EventType.KEY_DOWN, this.restart, this);
        input.on(Input.EventType.TOUCH_START, this.restartTouch, this);
    }

    restart (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.SPACE:
                director.loadScene("GameScene");
                break;
        }
    }

    restartTouch(event: EventTouch) {
        director.loadScene("GameScene");
    }

}

