import { _decorator, Component, Node, TiledMap, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelMap')
export class LevelMap extends Component {

    public pathRoute : Vec3[] = []
    private towerPoints : Vec3[] = []

    start() {
        var tiledMap = this.getComponent(TiledMap);
        var pathPoints = tiledMap.getObjectGroup("path").getObjects();
        var mapSize = tiledMap.getMapSize();
        var tileSize = tiledMap.getTileSize();
        var realSize = new Vec2(mapSize.x*tileSize.x, mapSize.y*tileSize.y)
        var realScaledSize = new Vec2(realSize.x*this.node.scale.x, realSize.y*this.node.scale.y)
        pathPoints.forEach(point => {
            var index:number = +point.name;
            this.pathRoute[index-1] = new Vec3(point.x*this.node.scale.x-realScaledSize.x/2, point.y*this.node.scale.y-realScaledSize.y/2, 0);
        });
        var towerPoints = tiledMap.getLayer("towers");
        console.log("realScaledSize ", realScaledSize);
        console.log("pathRoute ", this.pathRoute);
    }

    update(deltaTime: number) {
        
    }
}

