import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
import { GameManager } from './GameManager';
import { UiStar } from './UiStar';
const { ccclass, property } = _decorator;

@ccclass('LevelCompletePopup')
export class LevelCompletePopup extends Component {

    @property(Label)
    private starsCollectedLabel: Label;

    @property(Prefab)
    private uiStarPrefab: Prefab;

    @property(Node)
    private starContainerNode: Node;

    protected onEnable(): void {
        this.starsCollectedLabel.string = 'STARS: ' + GameManager.starsCollected + '/' + GameManager.starsInLevel;

        for (let i = 0; i < GameManager.starsInLevel; i++) {
            let uiStarInstance = instantiate(this.uiStarPrefab);
            uiStarInstance.setParent(this.starContainerNode);
            uiStarInstance.getComponent(UiStar).setState(GameManager.starsCollected > i);
        }
    }

    onResetButtonPressed() {
        GameManager.resetLevel();
    }

    onContinueButtonPressed() {
        GameManager.loadNextLevel();
    }
}