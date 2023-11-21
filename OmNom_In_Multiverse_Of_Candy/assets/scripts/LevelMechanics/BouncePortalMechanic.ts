import { Collider2D, _decorator } from 'cc';
import { GameManager } from '../GameManager';
import { LevelMechanic } from './LevelMechanic';
const { ccclass, property } = _decorator;

@ccclass('BouncePortalMechanic')
export class BouncePortalMechanic extends LevelMechanic {

    @property(Collider2D)
    private collider2D: Collider2D;

    start(): void {
        super.start();
        this.setColliderState(false);
    }

    onGameStateChanged(): void {
        super.onGameStateChanged();
        this.setColliderState(GameManager.isInGameplayState);
    }

    setColliderState(isEnabled: boolean) {
        this.collider2D.enabled = isEnabled;
    }
}


