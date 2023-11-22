import { _decorator, Component, director, EPhysics2DDrawFlags, EventTarget, PhysicsSystem2D } from 'cc';
import { LevelMechanicManager } from './LevelMechanics/LevelMechanicManager';
import { MechanicSelectedEvent } from './LevelMechanics/MechanicSelectedEvent';
import { LevelMechanicSettingsDisplay } from './LevelMechanicSettings/LevelMechanicSettingsDisplay';
import { Levels } from './Levels';
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

    start() {
        GameManager.instance = this;

        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
        EPhysics2DDrawFlags.Pair |
        EPhysics2DDrawFlags.CenterOfMass |
        EPhysics2DDrawFlags.Joint |
        EPhysics2DDrawFlags.Shape;

        this.node.on('mechanicSelected', this.onMechanicSelected, this);

        this.levelMechanicSettingsDisplay.setActive(false);

        GameManager.gameState = GameState.Editing;
        GameManager.starsCollected = 0;
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

    static loadNextLevel() {
        let currentLevel = director.getScene().name;

        let levelAmount = 0;
        let currentLevelIndex = 0;

        for (let level in Levels) {
            levelAmount++;

            if (currentLevel == Levels[level]) {
                currentLevelIndex = levelAmount;
            }
        }

        let nextLevelIndex = currentLevelIndex % levelAmount;
        director.loadScene(Levels[nextLevelIndex]);
    }
}