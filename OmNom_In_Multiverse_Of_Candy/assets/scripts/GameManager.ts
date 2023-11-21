import { _decorator, Component, EventTarget } from 'cc';
import { LevelMechanicBrowser } from './LevelMechanicBrowser/LevelMechanicBrowser';
import { LevelMechanicManager } from './LevelMechanics/LevelMechanicManager';
import { MechanicSelectedEvent } from './LevelMechanics/MechanicSelectedEvent';
import { LevelMechanicSettingsDisplay } from './LevelMechanicSettings/LevelMechanicSettingsDisplay';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(LevelMechanicBrowser)
    private levelMechanicBrowser: LevelMechanicBrowser;

    @property(LevelMechanicSettingsDisplay)
    private levelMechanicSettingsDisplay: LevelMechanicSettingsDisplay;

    @property(LevelMechanicManager)
    private levelMechanicManager: LevelMechanicManager;

    public static isInGameplayState: boolean;

    public static eventTarget: EventTarget = new EventTarget();

    start() {
        this.node.on('mechanicSelected', this.onMechanicSelected, this);
        this.node.on('gameplayStarted', this.onGameplayStarted, this);

        this.levelMechanicSettingsDisplay.setActive(false);

        GameManager.isInGameplayState = false;
    }

    onMechanicSelected(event: MechanicSelectedEvent) {
        event.propagationStopped = true;
        this.levelMechanicSettingsDisplay.show(event.levelMechanic);
    }

    onGameplayStarted() {
        this.levelMechanicBrowser.setActive(false);
        this.levelMechanicSettingsDisplay.setActive(false);

        GameManager.isInGameplayState = true;
        GameManager.eventTarget.emit('gameStateChanged');
    }
}