import { _decorator, CircleCollider2D, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    @property
    public speed:number = 1000;

    public positionToCreateBullet : Vec3;
    public directionToFollow : Vec3;
    public angle: number;
    public damage: number;

    private timer:number = 0.3;

    start() {

    }

    update(deltaTime: number) {
        this.node.position = new Vec3(this.node.position.x + this.directionToFollow.x * deltaTime * this.speed, 
                                      this.node.position.y + this.directionToFollow.y * deltaTime * this.speed);
        this.timer-=deltaTime;
        if (this.timer<0) {
            this.node.destroy();
        }
    }

    public init() {
        this.node.position = this.positionToCreateBullet;
        this.node.angle = this.angle + 180;
        let collider = this.node.getComponent(CircleCollider2D);
        if (collider) {
            collider.name = 'bullet';
            collider.apply();
        }

    }
}

