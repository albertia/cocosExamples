import { _decorator, Component, Node } from 'cc';
import { GameManager, GameState } from './GameManager';
import { LevelMechanicBrowser } from './LevelMechanicBrowser/LevelMechanicBrowser';
import { LevelMechanicSettingsDisplay } from './LevelMechanicSettings/LevelMechanicSettingsDisplay';
const { ccclass, property } = _decorator;

@ccclass('GameUI')
export class GameUI extends Component {

    @property(LevelMechanicBrowser)
    private levelMechanicBrowser: LevelMechanicBrowser;

    @property(LevelMechanicSettingsDisplay)
    private levelMechanicSettingsDisplay: LevelMechanicSettingsDisplay;

    @property(Node)
    private levelCompletePopup: Node;

    start() {
        GameManager.eventTarget.on('gameStateChanged', this.onGameStateChanged, this);
    }

    onDestroy() {
        GameManager.eventTarget.off('gameStateChanged', this.onGameStateChanged, this);
    }

    onGameStateChanged(gameState: GameState) {

        console.log(GameState[gameState]);

        switch (gameState) {
            case GameState.Editing:
                this.levelMechanicBrowser.setActive(true);
                break;
            case GameState.Playing:
                this.levelMechanicBrowser.setActive(false);
                this.levelMechanicSettingsDisplay.setActive(false);
                break;
            case GameState.LevelCompleted:
                this.levelCompletePopup.active = true;
                break;
        }
    }
}


