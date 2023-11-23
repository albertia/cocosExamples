import { _decorator, Component, Label } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('LevelCompletePopup')
export class LevelCompletePopup extends Component {

    @property(Label)
    private starsCollectedLabel: Label;

    protected onEnable(): void {
        this.starsCollectedLabel.string = 'STARS: ' + GameManager.starsCollected + '/' + GameManager.starsInLevel;
    }

    onResetButtonPressed() {
        GameManager.resetLevel();
    }

    onContinueButtonPressed() {
        GameManager.loadNextLevel();
    }
}