import { _decorator, Component, EventTouch, Node, NodeEventType, Size, TiledMap, TiledTile, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelMap')
export class LevelMap extends Component {

    public pathRoute : Vec3[] = [];
    public towerPoints : Vec3[] = [];
    private tiledMap:TiledMap;
    public tileSize:Size;
    private realScaledSize:Vec2;

    start() {
        this.tiledMap = this.getComponent(TiledMap);
        var mapSize = this.tiledMap.getMapSize();
        this.tileSize = this.tiledMap.getTileSize();
        var realSize = new Vec2(mapSize.x*this.tileSize.x, mapSize.y*this.tileSize.y)
        this.realScaledSize = new Vec2(realSize.x*this.node.scale.x, realSize.y*this.node.scale.y)
        this.tiledMap.getObjectGroup("path").getObjects().forEach(point => {
            var index:number = +point.name;
            this.pathRoute[index-1] = this.getTileCoordinatesByPosition(point);
        });

        this.tiledMap.getObjectGroup("towersPositions").getObjects().forEach(point => {
            var tIndex:number = +point.name;
            this.towerPoints[tIndex] = this.getTileCoordinatesByPosition(point);
        });
    }

    update(deltaTime: number) {
        
    }

    public getTileCoordinatesByPosition(point) {
        return new Vec3(
            Math.round(point.x*this.node.scale.x-this.realScaledSize.x/2), 
            Math.round(point.y*this.node.scale.y-this.realScaledSize.y/2),
             0);
    }

}

