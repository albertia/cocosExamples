import { _decorator, Component, director, Node, NodeEventType, Prefab, Sprite, SpriteFrame, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TowerGenerator')
export class TowerGenerator extends Component {

    @property(Prefab)
    public towerPrefab:Prefab;
    @property
    public fireRate:number = 1;
    @property
    public damagePerBullet:number = 10;
    public sprite : SpriteFrame;
    public positionToCreateTower : Vec3;
    public towerIndex:number;

    start() {
        this.sprite = this.node.getComponentInChildren(Sprite).spriteFrame;
        this.node.on(Node.EventType.TOUCH_END, this.generateTower, this);
    }
    generateTower() {
        director.emit('generateTower', this.positionToCreateTower, this.sprite, this.damagePerBullet, this.fireRate, this.towerIndex);
    }

    update(deltaTime: number) {
        
    }
}

