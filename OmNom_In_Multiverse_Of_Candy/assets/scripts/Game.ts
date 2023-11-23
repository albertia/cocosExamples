import { _decorator, Component } from 'cc';
import { GameManager, GameState } from './GameManager';
import { ScreenTransition } from './ScreenTransition';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {

    public numOmNoms: number = 0;
    public gameStarted: boolean = false;

    update(deltaTime: number) {
        if (this.gameStarted && this.numOmNoms <= 0) {
            this.gameStarted = false;

            setTimeout(function () {
                ScreenTransition.instance.doTransition(() => {
                    GameManager.setGameState(GameState.Editing);
                })
            }, 1000);
        }
    }
}

