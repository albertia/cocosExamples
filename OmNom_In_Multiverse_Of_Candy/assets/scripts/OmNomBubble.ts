import { Animation, Component, Node, NodeEventType, Prefab, _decorator, director, instantiate } from 'cc';
import { Game } from './Game';
import { GameManager, GameState } from './GameManager';
import { OmNom } from './OmNom';
const { ccclass, property } = _decorator;

@ccclass('OmNomBubble')
export class OmNomBubble extends Component {
    @property(Prefab)
    public omnomPrefab: Prefab;
    @property(Node)
    public gameNode: Node;

    start() {
        GameManager.eventTarget.on('gameStateChanged', this.onGameStateChanged, this);
        this.node.on(NodeEventType.TOUCH_END, this.startGame, this);
    }

    protected onDestroy(): void {
        GameManager.eventTarget.off('gameStateChanged', this.onGameStateChanged, this);
        this.node.off(NodeEventType.TOUCH_END, this.startGame, this);
        this.node.getComponent(Animation).off(Animation.EventType.FINISHED, this.playAnimAndStartGame, this);
    }

    onGameStateChanged(gameState: GameState) {
        if (gameState == GameState.Editing) {
            this.node.active = true;
            this.node.getChildByName("Bubble").active = true;
        }
    }

    startGame() {
        this.node.getComponent(Animation).on(Animation.EventType.FINISHED, this.playAnimAndStartGame, this);
        this.node.getComponent(Animation).play();
    }

    playAnimAndStartGame() {
        const omnom = instantiate(this.omnomPrefab);
        omnom.position = this.node.position;
        omnom.getComponent(OmNom).gameNode = this.gameNode;
        omnom.getComponent(OmNom).init();
        this.gameNode.addChild(omnom);
        this.gameNode.getComponent(Game).gameStarted = true;
        this.node.active = false;
        director.emit('bubbleExploded');
        GameManager.setGameState(GameState.Playing);
    }

}

