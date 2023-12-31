import { _decorator, BoxCollider2D, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Sprite, SpriteFrame, Vec3 } from 'cc';
import { LevelMap } from './LevelMap';
import { Bullet } from './Bullet';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    @property
    public speed:number = 200;
    @property
    public rotationSpeed:number = 360;

    public levelMapNode:Node;
    public spriteToUse:SpriteFrame;
    public pathToFollow:Vec3[]
    public health:number;

    private indexOfPath = 1;

    start() {
    }

    update(deltaTime: number) {
        if (this.health < 0) {
            this.node.destroy();
        }
        if (this.indexOfPath == this.pathToFollow.length) {
            // EXPLODE
            return;
        }
        var direction = new Vec3(this.pathToFollow[this.indexOfPath].x - this.node.position.x, this.pathToFollow[this.indexOfPath].y - this.node.position.y, 0);
        var distance = Math.sqrt(direction.x*direction.x + direction.y*direction.y);
        var toMove = deltaTime * this.speed;
        if (toMove > distance) {
            this.node.position = this.pathToFollow[this.indexOfPath];
            this.indexOfPath++;
        } else {
            if (direction.x > direction.y && direction.x > 0) {
                // To Right
                this.node.position = new Vec3(this.node.position.x + this.speed*deltaTime,this.node.position.y,0);
                if (this.node.angle > 180){
                    this.node.angle += this.rotationSpeed*deltaTime; 
                    if (this.node.angle > 360) {
                        this.node.angle = 0;
                    }
                }
                else if (this.node.angle > 0){
                    this.node.angle -= this.rotationSpeed*deltaTime; 
                    if (this.node.angle < 0) {
                        this.node.angle = 0;
                    }
                }
            }
            else if (direction.x < direction.y && direction.x < 0) {
                // To Left
                this.node.position = new Vec3(this.node.position.x - this.speed*deltaTime,this.node.position.y,0);
                if (this.node.angle < 180){
                    this.node.angle += this.rotationSpeed*deltaTime; 
                    if (this.node.angle > 180) {
                        this.node.angle = 180;
                    }
                }
                else if (this.node.angle > 180){
                    this.node.angle -= this.rotationSpeed*deltaTime; 
                    if (this.node.angle < 180) {
                        this.node.angle = 180;
                    }
                }
            }
            else if (direction.x < direction.y && direction.y > 0) {
                // To UP
                this.node.position = new Vec3(this.node.position.x ,this.node.position.y + this.speed*deltaTime,0);
                if (this.node.angle < 90){
                    this.node.angle += this.rotationSpeed*deltaTime; 
                    if (this.node.angle > 90) {
                        this.node.angle = 90;
                    }
                }
                else if (this.node.angle > 90){
                    this.node.angle -= this.rotationSpeed*deltaTime; 
                    if (this.node.angle < 90) {
                        this.node.angle = 90;
                    }
                }
            } 
            else if (direction.x > direction.y && direction.y < 0) {
                // To Down
                this.node.position = new Vec3(this.node.position.x ,this.node.position.y - this.speed*deltaTime,0);
                if (this.node.angle > 90 && this.node.angle < 270){
                    this.node.angle += this.rotationSpeed*deltaTime; 
                    if (this.node.angle > 270) {
                        this.node.angle = 270;
                    }
                }
                else if (this.node.angle > 270 || this.node.angle < 90){
                    this.node.angle -= this.rotationSpeed*deltaTime;
                    if (this.node.angle < 0) {
                        this.node.angle += 360;
                    }
                    if (this.node.angle < 270) {
                        this.node.angle = 270;
                    }
                }
            }       
        }
    }

    public init(){
        this.pathToFollow = this.levelMapNode.getComponent(LevelMap).pathRoute;
        this.getComponent(Sprite).spriteFrame = this.spriteToUse;
        this.node.position = this.pathToFollow[0];
        this.node.angle = 90;
        let collider = this.node.getComponent(BoxCollider2D);

        collider.size.x = 24;
        collider.size.y = 28;
        collider.name = "enemy";
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        collider.apply();
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        if (otherCollider.name == 'bullet') {
            this.health -= otherCollider.node.getComponent(Bullet).damage;
            setTimeout(() => {
                otherCollider.node.destroy();
            }, 1);

        }        
    }

}