import { _decorator, CCInteger, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemMovement')
export class ItemMovement extends Component {

    @property(CCInteger)
    public speed:number = 100;

    private movingToEnd:boolean = true;
    private position:Vec3;
    private positionInit:Vec3;
    private positionEnd:Vec3;

    public lastMovementAmount:Vec3 = new Vec3();

    start() {
        this.position = this.node.getChildByName("InitMovement").position;
        this.positionInit = this.node.getChildByName("InitMovement").position;
        this.positionEnd = this.node.getChildByName("EndMovement").position;
        this.movingToEnd = true;
    }

    update(deltaTime: number) {
        var nextNode = this.positionEnd;
        if (!this.movingToEnd) {
            nextNode = this.positionInit;
        }
        var direction = new Vec3(nextNode.x - this.position.x, nextNode.y - this.position.y).normalize();
        var distanceX = direction.x*this.speed*deltaTime;
        var distanceY = direction.y*this.speed*deltaTime;
        if (nextNode.x <= this.position.x && nextNode.x >= this.position.x + distanceX ||
            nextNode.x >= this.position.x && nextNode.x <= this.position.x + distanceX) {
            this.movingToEnd = !this.movingToEnd;
        }
        this.position = new Vec3(this.position.x + distanceX, this.position.y + distanceY);
        var parentPos = this.node.getParent().position;
        this.node.getParent().position = new Vec3(parentPos.x + distanceX, parentPos.y + distanceY);
        this.lastMovementAmount = new Vec3(distanceX, distanceY);
    }
}

