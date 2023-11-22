import { _decorator, BoxCollider2D, CircleCollider2D, Collider2D, Color, Component, Contact2DType, director, ERigidBody2DType, IPhysics2DContact, Node, PolygonCollider2D, RigidBody, RigidBody2D, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NonOverlappingItem')
export class NonOverlappingItem extends Component {

    private gameStarted:boolean = false;
    private collider:Collider2D;
    private collisions:number = 0;
    private collisionsAllowed = ["gravityField", "blackHole"]

    start() {
        this.collider = this.node.getComponent(CircleCollider2D);
        if (!this.collider) {
            this.collider = this.node.getComponent(BoxCollider2D);
        }
        if (!this.collider) {
            this.collider = this.node.getComponent(PolygonCollider2D);
        }
        // this.collider.sensor = false;
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        this.collider.apply();
        this.node.getComponent(RigidBody2D).enabledContactListener = true;
        this.node.getComponent(RigidBody2D).allowSleep = false;
        this.node.getComponent(RigidBody2D).type = ERigidBody2DType.Dynamic;
        director.on('bubbleExploded', this.onBubbleExploded, this);
    }

    update(deltaTime: number) {
        
    }

    onBubbleExploded() {
        console.log("onBubbleExploded ", this.collisions);
        if (this.collisions > 0) {
            console.log("onBubbleExploded Delete node");
            this.node.destroy();
        }
        this.node.getComponent(RigidBody2D).enabledContactListener = false;
        this.node.getComponent(RigidBody2D).allowSleep = true;
        this.node.getComponent(RigidBody2D).gravityScale = 0;
        this.node.getComponent(RigidBody2D).type = ERigidBody2DType.Kinematic;
        this.collider.apply();
        this.gameStarted = true;
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

