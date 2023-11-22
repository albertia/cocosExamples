import { _decorator, Component, Node } from 'cc';
import { GameManager, GameState } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('GameUI')
export class GameUI extends Component {

    @property(Node)
    private levelCompletePopup: Node;

    start() {
        GameManager.eventTarget.on('gameStateChanged', this.onGameStateChanged, this);
    }

    onDestroy() {
        GameManager.eventTarget.off('gameStateChanged', this.onGameStateChanged, this);
    }

    onGameStateChanged(gameState: GameState) {
        if (gameState == GameState.LevelCompleted) {
            this.levelCompletePopup.active = true;
        }
    }
}


