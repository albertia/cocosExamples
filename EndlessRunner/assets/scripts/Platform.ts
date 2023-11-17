import { _decorator, Component, Node, Vec3, Prefab, instantiate, Sprite, UITransform, BoxCollider2D} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Platform')
export class Platform extends Component {
    @property(Prefab)
    public tile = null;
    @property
    public createPosition:Vec3 = new Vec3(0.0, 0.0, 0.0);
    @property
    public tilesCount:number = 3;

    public platformSpeed:number = 150;
    public totalWidth:number = 0;
    public tileWidth:number = 0;
    public totalHeight:number = 0;

    start() {
    }

    update(deltaTime: number) {
        this.node.position = new Vec3(this.node.position.x-deltaTime*this.platformSpeed, this.node.position.y,0); 
    }

   public init() {
        this.node.position = this.createPosition;
        for (let i = 0; i < this.tilesCount; ++i) {
            const tile = instantiate(this.tile);
            this.node.addChild(tile);
            this.tileWidth = tile.getComponent(Sprite).node.getComponent(UITransform).width;
            this.totalHeight = tile.getComponent(Sprite).node.getComponent(UITransform).height;
            tile.position = new Vec3(i * this.tileWidth, 0, 0)
            this.totalWidth += this.tileWidth;
        }

        var collider = this.node.getComponent(BoxCollider2D);
        collider.size.x = this.totalWidth;
        collider.size.y = this.totalHeight;
        collider.offset.x = this.totalWidth/2 - this.tileWidth/2;
        collider.name = 'platform'
        collider.apply();
    }
}

