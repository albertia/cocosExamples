import { Component, _decorator } from 'cc';
import { LevelMechanicSettingsDisplay } from '../LevelMechanicSettings/LevelMechanicSettingsDisplay';
import { MechanicSelectedEvent } from './MechanicSelectedEvent';
const { ccclass, property } = _decorator;

@ccclass('LevelMechanicManager')
export class LevelMechanicManager extends Component {

    @property({ type: LevelMechanicSettingsDisplay })
    private levelMechanicSettingsDisplay: LevelMechanicSettingsDisplay | null = null;

    start() {
        this.node.on('mechanic', this.onMechanicSelected, this);

        this.levelMechanicSettingsDisplay.setActive(false);
    }

    update(deltaTime: number) {

    }

    onMechanicSelected(event: MechanicSelectedEvent) {
        event.propagationStopped = true;

        this.levelMechanicSettingsDisplay.show(event.levelMechanic);
    }
}


