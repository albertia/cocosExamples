import { _decorator, CircleCollider2D, Collider2D, Color, Component, Contact2DType, director, ERigidBody2DType, IPhysics2DContact, RigidBody2D, Sprite } from 'cc';
import { GameManager, GameState } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('NonOverlappingItem')
export class NonOverlappingItem extends Component {

    private gameStarted: boolean = false;
    private collider: Collider2D;
    private rigidbody: RigidBody2D;
    private collisions: number = 0;
    private collisionsAllowed = ["gravityField", "blackHole", "omnom"]

    private originalEnable: boolean;
    private originalType: ERigidBody2DType;
    private originalContactListener: boolean;

    start() {
        director.on('bubbleExploded', this.onBubbleExploded, this);
        GameManager.eventTarget.on('gameStateChanged', this.onGameStateChanged, this);

        this.collider = this.node.getComponent(CircleCollider2D);
        this.rigidbody = this.node.getComponent(RigidBody2D);
        this.originalEnable = this.collider.enabled;
        this.originalType = this.rigidbody.type;
        this.originalContactListener = this.rigidbody.enabledContactListener;


        this.onBubbleRecreated();
    }

    update(deltaTime: number) {

    }

    onGameStateChanged(gameState: GameState) {
        if (gameState == GameState.Editing) {
            this.onBubbleRecreated();
        }
    }

    onBubbleRecreated() {
        this.gameStarted = false;
        /* We will ise only circle colliders for this. In the case of polygon one, for the bounce, we will enable/disable it.
        if (!this.collider) {
            this.collider = this.node.getComponent(BoxCollider2D);
        }
        if (!this.collider) {
            this.collider = this.node.getComponent(PolygonCollider2D);
        }
        */
        this.collider.enabled = true;
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        this.collider.apply();


        this.rigidbody.enabledContactListener = true;
        this.rigidbody.allowSleep = false;
        this.rigidbody.type = ERigidBody2DType.Dynamic;
    }

    onBubbleExploded() {
        this.gameStarted = true;
        if (this.collisions > 0) {
            this.node.destroy();
        }
        this.rigidbody.enabledContactListener = this.originalContactListener;
        this.rigidbody.type = this.originalType;
        this.collider.enabled = this.originalEnable;
        this.collider.apply();
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (!this.gameStarted) {
            if (this.collisionsAllowed.find(name => name == otherCollider.name) == undefined) {
                this.collisions++;
                this.node.getComponentInChildren(Sprite).color = new Color(255, 0, 0);
            }
        }
    }

    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (!this.gameStarted) {
            if (this.collisionsAllowed.find(name => name == otherCollider.name) == undefined) {
                this.collisions--;
                if (this.collisions == 0) {
                    this.node.getComponentInChildren(Sprite).color = new Color(255, 255, 255);
                }
            }
        }
    }
}

