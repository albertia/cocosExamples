import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {

    public numOmNoms:number = 0;
    public starsCollected:number = 0;
    public gameStarted:boolean = false;

    start() {
        this.starsCollected = 0;
    }

    update(deltaTime: number) {
        if (this.gameStarted && this.numOmNoms <= 0) {
            director.loadScene(director.getScene().name);
        }
    }
}

