import { Collider2D, _decorator } from 'cc';
import { GameState } from '../GameManager';
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

    onGameStateChanged(gameState: GameState): void {
        super.onGameStateChanged(gameState);
        this.setColliderState(gameState != GameState.Editing);
    }

    setColliderState(isEnabled: boolean) {
        this.collider2D.enabled = isEnabled;
    }
}


