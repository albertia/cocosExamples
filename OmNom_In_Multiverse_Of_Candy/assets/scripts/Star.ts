import { _decorator, CircleCollider2D, Component } from 'cc';
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
    }

    onDestroy() {
        GameManager.eventTarget.off('gameStateChanged', this.onGameStateChanged, this);
    }

    onGameStateChanged(gameState: GameState) {
        if (gameState == GameState.Editing) {
            this.node.active = true;
        }
    }
}

