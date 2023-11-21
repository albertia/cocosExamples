import { Event } from 'cc';

export class GameplayStartedEvent extends Event {
    constructor(name: string, bubbles?: boolean) {
        super(name, bubbles);
    }
}


