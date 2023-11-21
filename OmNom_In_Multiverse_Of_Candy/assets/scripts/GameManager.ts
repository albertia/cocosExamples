import { _decorator, Component } from 'cc';
import { LevelMechanicBrowser } from './LevelMechanicBrowser/LevelMechanicBrowser';
import { MechanicSelectedEvent } from './LevelMechanics/MechanicSelectedEvent';
import { LevelMechanicSettingsDisplay } from './LevelMechanicSettings/LevelMechanicSettingsDisplay';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(LevelMechanicBrowser)
    private levelMechanicBrowser: LevelMechanicBrowser;

    @property(LevelMechanicSettingsDisplay)
    private levelMechanicSettingsDisplay: LevelMechanicSettingsDisplay;

    start() {
        this.node.on('mechanicSelected', this.onMechanicSelected, this);
        this.node.on('gameplayStarted', this.onGameplayStarted, this);

        this.levelMechanicSettingsDisplay.setActive(false);
    }

    onMechanicSelected(event: MechanicSelectedEvent) {
        event.propagationStopped = true;
        this.levelMechanicSettingsDisplay.show(event.levelMechanic);
    }

    onGameplayStarted() {
        this.levelMechanicBrowser.setActive(false);
        this.levelMechanicSettingsDisplay.setActive(false);
    }
}


