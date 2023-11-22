import { _decorator, BoxCollider2D, CircleCollider2D, Collider2D, Color, Component, Contact2DType, director, ERigidBody2DType, IPhysics2DContact, Node, PolygonCollider2D, RigidBody, RigidBody2D, Sprite } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('NonOverlappingItem')
export class NonOverlappingItem extends Component {

    private gameStarted:boolean = false;
    private collider:Collider2D;
    private collisions:number = 0;
    private collisionsAllowed = ["gravityField", "blackHole", "omnom"]

    private originalEnable:boolean;
    private originalType:ERigidBody2DType;
    private originalContactListener:boolean;

    start() {
        director.on('bubbleExploded', this.onBubbleExploded, this);
        GameManager.eventTarget.on('gameStateChanged', this.onBubbleRecreated, this);
        this.onBubbleRecreated();
    }

    update(deltaTime: number) {
        
    }

    onBubbleRecreated() {
        this.gameStarted = false;
        this.collider = this.node.getComponent(CircleCollider2D);
        /* We will ise only circle colliders for this. In the case of polygon one, for the bounce, we will enable/disable it.
        if (!this.collider) {
            this.collider = this.node.getComponent(BoxCollider2D);
        }
        if (!this.collider) {
            this.collider = this.node.getComponent(PolygonCollider2D);
        }
        */
        this.originalEnable = this.collider.enabled;
        this.collider.enabled = true;
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        this.collider.apply();
        
        this.originalType = this.node.getComponent(RigidBody2D).type;
        this.originalContactListener = this.node.getComponent(RigidBody2D).enabledContactListener;

        this.node.getComponent(RigidBody2D).enabledContactListener = true;
        this.node.getComponent(RigidBody2D).allowSleep = false;
        this.node.getComponent(RigidBody2D).type = ERigidBody2DType.Dynamic;
    }

    onBubbleExploded() {
        this.gameStarted = true;
        if (this.collisions > 0) {
            this.node.destroy();
        }
        this.node.getComponent(RigidBody2D).enabledContactListener = this.originalContactListener;
        this.node.getComponent(RigidBody2D).type = this.originalType;
        this.collider.enabled = this.originalEnable;
        this.collider.apply();
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log("CollisionBegin - NonOverlappingItem", otherCollider, ' gameStarted ', this.gameStarted);
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

