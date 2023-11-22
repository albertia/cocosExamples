import { CCBoolean, Node, Sprite, SpriteFrame, Tween, Vec3, _decorator, randomRange, tween } from 'cc';
import { LevelMechanic, LevelMechanicColor } from './LevelMechanic';
import { LevelMechanicManager } from './LevelMechanicManager';
const { ccclass, property } = _decorator;

@ccclass('PortalMechanic')
export class PortalMechanic extends LevelMechanic {

    @property(CCBoolean)
    public isGuidedPortal: boolean;

    @property(Node)
    private visualsNode: Node;

    @property({ type: Sprite })
    private sprite: Sprite | null = null;

    @property({ type: SpriteFrame })
    private blueSprite: SpriteFrame | null = null;

    @property({ type: SpriteFrame })
    private greenSprite: SpriteFrame | null = null;

    @property({ type: SpriteFrame })
    private purpleSprite: SpriteFrame | null = null;

    private animationTween: Tween<Vec3>;

    start() {
        super.start();
        LevelMechanicManager.registerPortalMechanic(this);
    }

    onDestroy() {
        super.onDestroy();
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

    doAnimation() {
        if (this.animationTween != null) {
            this.animationTween.stop();
        }

        let randomX = randomRange(0.6, 0.9);
        let randomY = randomRange(0.6, 0.9);

        this.animationTween =
            tween(this.visualsNode.scale)
                .to(0.05, new Vec3(randomX, randomY, 1), { easing: "linear" })
                .to(0.05, Vec3.ONE, { easing: "linear" })
                .start();
    }
}


