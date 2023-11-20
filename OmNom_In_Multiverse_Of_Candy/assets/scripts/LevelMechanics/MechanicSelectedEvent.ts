import { Event } from 'cc';
import { LevelMechanic } from './LevelMechanic';

export class MechanicSelectedEvent extends Event {
    constructor(name: string, levelMechanic: LevelMechanic, bubbles?: boolean) {
        super(name, bubbles);

        this.levelMechanic = levelMechanic;
    }

    public levelMechanic: LevelMechanic = null;
}