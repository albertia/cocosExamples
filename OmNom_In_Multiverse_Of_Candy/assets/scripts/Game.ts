import { _decorator, Component, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {

    public numOmNoms: number = 0;
    public gameStarted: boolean = false;

    update(deltaTime: number) {
        if (this.gameStarted && this.numOmNoms <= 0) {
            director.loadScene(director.getScene().name);
        }
    }
}

