import { _decorator, Component, director, EventTarget } from 'cc';
import { LevelMechanicManager } from './LevelMechanics/LevelMechanicManager';
import { MechanicSelectedEvent } from './LevelMechanics/MechanicSelectedEvent';
import { LevelMechanicSettingsDisplay } from './LevelMechanicSettings/LevelMechanicSettingsDisplay';
import { Levels } from './Levels';
import { ScreenTransition } from './ScreenTransition';
const { ccclass, property } = _decorator;

export enum GameState {
    Editing,
    Playing,
    LevelCompleted
}

@ccclass('GameManager')
export class GameManager extends Component {

    @property(LevelMechanicSettingsDisplay)
    private levelMechanicSettingsDisplay: LevelMechanicSettingsDisplay;

    @property(LevelMechanicManager)
    private levelMechanicManager: LevelMechanicManager;

    public static instance: GameManager;
    public static gameState: GameState = GameState.Editing;
    public static eventTarget: EventTarget = new EventTarget();
    public static starsCollected: number;
    public static starsInLevel: number;

    start() {
        GameManager.instance = this;
        /*
                PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
                EPhysics2DDrawFlags.Pair |
                EPhysics2DDrawFlags.CenterOfMass |
                EPhysics2DDrawFlags.Joint |
                EPhysics2DDrawFlags.Shape;
        */
        this.node.on('mechanicSelected', this.onMechanicSelected, this);

        this.levelMechanicSettingsDisplay.setActive(false);

        GameManager.gameState = GameState.Editing;
        GameManager.starsCollected = 0;
        GameManager.starsInLevel = 0;
    }

    onDestroy() {
        this.node.off('mechanicSelected', this.onMechanicSelected, this);
    }

    onMechanicSelected(event: MechanicSelectedEvent) {
        event.propagationStopped = true;
        this.levelMechanicSettingsDisplay.show(event.levelMechanic);
    }

    static setGameState(gameState: GameState) {
        if (GameManager.gameState == gameState) {
            return;
        }

        GameManager.gameState = gameState;

        switch (gameState) {
            case GameState.Editing:
                this.starsCollected = 0;
                break;
        }

        GameManager.eventTarget.emit('gameStateChanged', gameState);
    }

    static resetLevel() {
        ScreenTransition.instance.doTransition(() => {
            director.loadScene(director.getScene().name);
        });
    }

    static loadNextLevel() {
        ScreenTransition.instance.doTransition(() => {
            let currentLevel = director.getScene().name;

            let levelAmount = 0;
            let currentLevelIndex = 0;

            for (let level in Levels) {

                if (isNaN(Number(level))) {
                    continue;
                }

                levelAmount++;

                if (currentLevel == Levels[level]) {
                    currentLevelIndex = levelAmount;
                }
            }

            let nextLevelIndex = currentLevelIndex % levelAmount;
            director.loadScene(Levels[nextLevelIndex]);
        });
    }
}