import { _decorator, Camera, Component, director, EPhysics2DDrawFlags, EventTouch, Input, input, instantiate, Node, PhysicsSystem2D, Prefab, Sprite, Vec2, Vec3 } from 'cc';
import { LevelMap } from './components/LevelMap';
import { PanelCreate } from './components/PanelCreate';
import { Tower } from './components/Tower';
import { Bullet } from './components/Bullet';
const { ccclass, property } = _decorator;

@ccclass('CanvasTouch')
export class CanvasTouch extends Component {
    @property(Node)
    public levelMapNode:Node;
    @property(Prefab)
    public bulletPrefab:Prefab;
    @property(Prefab)
    public popupPrefab:Prefab;
    @property(Prefab)
    public towerPrefab:Prefab;
    @property(Camera)
    public camera:Camera;

    private towers:boolean[] = []

    start() {
        input.on(Input.EventType.TOUCH_END, this.onMapTouch, this);
        director.on('generateTower', (positionToCreateTower, sprite, damagePerBullet, fireRate, towerIndex) => {
            const nTower = instantiate(this.towerPrefab);
            nTower.getComponent(Sprite).spriteFrame = sprite;
            nTower.getComponent(Tower).positionToCreateTower = positionToCreateTower;
            nTower.getComponent(Tower).damagePerBullet = damagePerBullet;
            nTower.getComponent(Tower).fireRate = fireRate;
            nTower.getComponent(Tower).init();
            this.towers[towerIndex] = true;
            this.node.addChild(nTower);
            this.node.getComponentsInChildren(PanelCreate).forEach(child => {
                child.node.destroy();
            });    
        });
        director.on('generateBullet', (positionToCreateBullet, directionToFollow, angle, damagePerBullet) => {
            const bullet = instantiate(this.bulletPrefab);
            bullet.getComponent(Bullet).positionToCreateBullet = positionToCreateBullet;
                //new Vec3(this.node.position.x + direction.y * 15, this.node.position.y + direction.y * 15);
            bullet.getComponent(Bullet).directionToFollow = directionToFollow;
            bullet.getComponent(Bullet).angle = angle;
            bullet.getComponent(Bullet).damage = damagePerBullet;
            bullet.getComponent(Bullet).init();
            this.node.addChild(bullet);
        });
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
        EPhysics2DDrawFlags.Pair |
        EPhysics2DDrawFlags.CenterOfMass |
        EPhysics2DDrawFlags.Joint |
        EPhysics2DDrawFlags.Shape;
    }

    update(deltaTime: number) {
        
    }

    onMapTouch(e : EventTouch) {
        this.node.getComponentsInChildren(PanelCreate).forEach(child => {
            child.node.destroy();
        });
        const touchPoint = e.getLocation();
        var worldTouchPoint: Vec3 = new Vec3();
        this.camera.camera.screenToWorld(worldTouchPoint, new Vec3(touchPoint.x, touchPoint.y, 0.5));
        const coords = this.levelMapNode.getComponent(LevelMap).getTileCoordinatesByPosition(worldTouchPoint)
        var towerTouched = this.isInTowerPoint(coords);
        if (towerTouched>=0 && (this.towers[towerTouched] == undefined || !this.towers[towerTouched])) {
            var positionForPopup:Vec3 = this.levelMapNode.getComponent(LevelMap).towerPoints[towerTouched];
            const popup = instantiate(this.popupPrefab);
            popup.getComponentInChildren(PanelCreate).posToBeCreated = positionForPopup;
            popup.getComponentInChildren(PanelCreate).towerIndex = towerTouched;
            popup.getComponentInChildren(PanelCreate).init();
            this.node.addChild(popup);
        }
    }

    isInTowerPoint(point) {
        var towerIndex = 0;
        var towerTouched = -1;
        this.levelMapNode.getComponent(LevelMap).towerPoints.forEach(tower => {
            var minx = tower.x - this.levelMapNode.getComponent(LevelMap).tileSize.width/2
            var maxx = tower.x + this.levelMapNode.getComponent(LevelMap).tileSize.width/2
            var miny = tower.y - this.levelMapNode.getComponent(LevelMap).tileSize.height/2
            var maxy = tower.y + this.levelMapNode.getComponent(LevelMap).tileSize.height/2
            if (point.x >= minx && point.x <= maxx && point.y >= miny && point.y <= maxy) {
                towerTouched = towerIndex;
            }
            towerIndex++;
        })
        return towerTouched;
    }


}

