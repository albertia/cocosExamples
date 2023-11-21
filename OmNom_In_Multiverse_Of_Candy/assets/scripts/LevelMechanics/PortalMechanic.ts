import { CCBoolean, Sprite, SpriteFrame, _decorator } from 'cc';
import { LevelMechanic, LevelMechanicColor } from './LevelMechanic';
import { LevelMechanicManager } from './LevelMechanicManager';
const { ccclass, property } = _decorator;

@ccclass('PortalMechanic')
export class PortalMechanic extends LevelMechanic {

    @property(CCBoolean)
    public isGuidedPortal: boolean;

    @property({ type: Sprite })
    private sprite: Sprite | null = null;

    @property({ type: SpriteFrame })
    private blueSprite: SpriteFrame | null = null;

    @property({ type: SpriteFrame })
    private greenSprite: SpriteFrame | null = null;

    @property({ type: SpriteFrame })
    private purpleSprite: SpriteFrame | null = null;

    start() {
        super.start();
        LevelMechanicManager.registerPortalMechanic(this);
    }

    onDestroy() {
        LevelMechanicManager.unregisterPortalMechanic(this);
    }

    changeColor(): void {
        super.changeColor();

        switch (this.levelMechanicColor) {
            case LevelMechanicColor.Blue:
                this.sprite.spriteFrame = this.blueSprite;
                break;
            case LevelMechanicColor.Green:
                this.sprite.spriteFrame = this.greenSprite;
                break;
            case LevelMechanicColor.Purple:
                this.sprite.spriteFrame = this.purpleSprite;
                break;
            default:
                console.log('unhandled LevelMechanicColor');
                break;
        }
    }
}


