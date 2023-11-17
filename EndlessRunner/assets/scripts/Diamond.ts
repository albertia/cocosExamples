import { _decorator, Component, Node, Vec3, Prefab, instantiate, Sprite, UITransform, BoxCollider2D} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Diamond')
export class Diamond extends Component {
    @property
    public createPosition:Vec3 = new Vec3(0.0, 0.0, 0.0);

    public diamondSpeed:number = 150;

    public totalWidth:number = 0;

    start() {
        this.totalWidth = this.node.getComponent(Sprite).node.getComponent(UITransform).width;
        var collider = this.node.getComponent(BoxCollider2D);
        collider.name = 'diamond'
        collider.sensor = true;
        collider.apply();
    }

    update(deltaTime: number) {
        this.node.position = new Vec3(this.node.position.x-deltaTime*this.diamondSpeed, this.node.position.y,0); 
        if (this.node.position.x < -this.diamondSpeed*4) {
            // Destroy after 4 seconds after going through the center of the screen
            setTimeout(function () {
                this.node.destroy();
              }.bind(this), 1); 
        }
    }

   public init() {
        this.node.position = this.createPosition;
    }
}

