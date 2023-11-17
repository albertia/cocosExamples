import { _decorator, Component, input, Input, EventKeyboard, EventTouch, Collider2D, Contact2DType, 
    IPhysics2DContact, PhysicsSystem2D, KeyCode, Node, Vec2, RigidBody, RigidBody2D, Vec3, Sprite, Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Hero')
export class Hero extends Component {

    private isJumping=false;
    private jumpKeyPressed = false;
    private touchingGround = false;
    private jumpFinished = false;
    private startJumpY = 0.0;
    private animation:Animation;
    @property
    public jumpSpeed:Vec2 = new Vec2(0.0, 300.0);
    @property
    public jumpMaxHeight = 300;
    @property(Sprite)
    public jumpSprite:Sprite;
    private body : RigidBody2D;

    protected onLoad(): void {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);

        // Registering callback functions for a single collider
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }

        // Registering global contact callback functions
        //if (PhysicsSystem2D.instance) {
        //    PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        //}
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.SPACE:
                this.jumpKeyPressed = true;
                break;
        }
    }
    onKeyUp (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.SPACE:
                this.isJumping = false;
                this.jumpKeyPressed = false;
                break;
        }
    }

    onTouchStart(event: EventTouch) {
        this.jumpKeyPressed = true;
    }

    onTouchEnd(event: EventTouch) {
        this.isJumping = false;
        this.jumpKeyPressed = false;
    }


    start() {
        this.isJumping = false;
        this.jumpKeyPressed = false;
        this.touchingGround = false;
        this.body = this.getComponent(RigidBody2D);
        this.animation = this.node.getComponent(Animation);
    }

    update(deltaTime: number) {
        if (this.jumpKeyPressed) {
            this.jump(deltaTime);
        }
        this.animate();
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        if (otherCollider.name == 'platform') {
            this.touchingGround = true;
        } 
        if (otherCollider.name == 'diamond') {
            setTimeout(() => {
                otherCollider.node.destroy();
            }, 1);
            this.node.emit('score');
        } 
    }
    onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        if (otherCollider.name == 'platform') {
            this.touchingGround = false;
        }
    }

    jump(deltaTime: number) {
        if (this.touchingGround) {
            this.startJumpY = this.node.position.y;    
            this.isJumping = true;
            this.jumpFinished = false;
            this.body.linearVelocity = this.jumpSpeed;    
        } else if (this.isJumping && !this.jumpFinished) {
            if (this.node.position.y < this.startJumpY + this.jumpMaxHeight) {
                this.body.linearVelocity = this.jumpSpeed;    
            } else {
                this.jumpFinished = true;
            }
        }
    }
    animate() {
        if (this.touchingGround) {
            // hero is running on the platform
            if (!this.animation.getState("walkjing").isPlaying) {
                this.animation.getState("walkjing").play();
            }
        } else {
            // the hero is jumping
            if (this.animation.getState("walkjing").isPlaying) {
                this.animation.getState("walkjing").stop();
                this.getComponent(Sprite).spriteFrame = this.jumpSprite.spriteFrame;
            }
        }
    }
}