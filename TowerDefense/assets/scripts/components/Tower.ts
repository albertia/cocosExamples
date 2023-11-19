import { _decorator, CircleCollider2D, Collider2D, Component, Contact2DType, director, instantiate, IPhysics2DContact, Node, Prefab, Quat, Vec2, Vec3 } from 'cc';
import { Bullet } from './Bullet';
const { ccclass, property } = _decorator;

@ccclass('Tower')
export class Tower extends Component {

    public fireRate:number;
    public damagePerBullet:number;
    public positionToCreateTower : Vec3;

    private enemiesAtRange : Node[];
    private timer:number;

    start() {
        this.enemiesAtRange = [];
    }

    update(deltaTime: number) {
        this.timer -= deltaTime;
        // AIM TO NEAREST TARGET
        var targetIndex = this.getFirstTarget();
        if (targetIndex >= 0) {
            var target = this.enemiesAtRange[targetIndex];
            var direction = new Vec3(target.position.x - this.node.position.x, target.position.y - this.node.position.y).normalize();
            var angleRad = Math.atan2(direction.y, direction.x)- Math.PI/2;
            var angle = angleRad*180/Math.PI;
            this.node.angle = angle;
            // SHOOT
            if (this.timer <= 0) {
                this.timer = this.fireRate;
                director.emit('generateBullet', this.node.position, direction, angle, this.damagePerBullet);
            }
        }
    }

    public init(){
        this.node.position = this.positionToCreateTower;
        this.timer = this.fireRate;

        let collider = this.node.getComponent(CircleCollider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }

    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        if (otherCollider.name == 'enemy') {
            this.enemiesAtRange.push(otherCollider.node);
        }
    }
    onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        if (otherCollider.name == 'enemy') {
            this.enemiesAtRange = this.enemiesAtRange.filter(t => t !==otherCollider.node);
        }
    }

    getNearestTarget() {
        if (this.enemiesAtRange.length > 0) {
            var nearestTarget = 0;
            var distance:number = Math.sqrt(Math.pow(this.enemiesAtRange[0].position.x - this.node.position.x, 2) + Math.pow(this.enemiesAtRange[0].position.y - this.node.position.y, 2));
            for (var i = 1; i < this.enemiesAtRange.length; i++) {
                var distanceToTarget = Math.sqrt(Math.pow(this.enemiesAtRange[i].position.x - this.node.position.x, 2) + Math.pow(this.enemiesAtRange[i].position.y - this.node.position.y, 2));
                if (distanceToTarget < distance) {
                    distance = distanceToTarget;
                    nearestTarget = i;
                }
            }
            return nearestTarget;
        }
        return -1;
    }
    getFirstTarget() {
        if (this.enemiesAtRange.length > 0) {
            return 0;
        }
        return -1;
    }

}

