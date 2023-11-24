import { _decorator, Animation, CircleCollider2D, Component, Sprite } from 'cc';
import { GameManager, GameState } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Star')
export class Star extends Component {
    start() {
        GameManager.eventTarget.on('gameStateChanged', this.onGameStateChanged, this);
        GameManager.starsInLevel++;

        let collider = this.node.getComponent(CircleCollider2D);
        collider.name = 'star'
        collider.apply();

        this.node.getComponent(Animation).on(Animation.EventType.FINISHED, this.hide, this);
        console.log("Start Star")
    }

    onDestroy() {
        GameManager.eventTarget.off('gameStateChanged', this.onGameStateChanged, this);
        this.node.getComponent(Animation).off(Animation.EventType.FINISHED, this.hide, this);
        console.log("Destroy Star")
    }

    onGameStateChanged(gameState: GameState) {
        console.log("GameStateChanged Star")
        if (gameState == GameState.Editing) {
            console.log("Changed to Editing Star")
            this.node.active = true;
            this.node.getChildByName("Star").active = true;
            this.node.getComponent(Sprite).enabled = true;
            this.node.getChildByName("Star").getComponent(Sprite).enabled = true;
        }
    }

    touched() {
        console.log("Touched Star");
        this.node.getComponent(Animation).play();
    }

    hide() {
        console.log("Hide Star")
        this.node.active = false;
    }
}

