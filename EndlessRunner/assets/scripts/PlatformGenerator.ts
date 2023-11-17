import { _decorator, Component, Node, Prefab, instantiate, Vec3, randomRangeInt, Sprite, UITransform } from 'cc';
import { Platform } from './Platform';
import { Diamond } from './Diamond';
const { ccclass, property } = _decorator;

@ccclass('PlatformGenerator')
export class PlatformGenerator extends Component {
    @property(Prefab)
    public platform = null;
    @property(Prefab)
    public diamond = null;
    @property
    public generateEvery:number = 1;
    @property
    public generateAtDistance:number = 200;
    @property
    public generateAtHeightMin:number = -100;
    @property
    public generateAtHeightMax:number = 100;
    @property
    public maxPlatformsInArray:number = 6;
    @property
    public percentToGenerateDiamondsInEachTile:number = 50;
    @property
    public movementSpeed:number = 150;


    private timer:number = 1;
    private platformIndex:number = 0;
    public platforms:Array<Node> = [];


    start() {
        if (this.maxPlatformsInArray < 4) {
            this.maxPlatformsInArray = 4;
        }
        this.createPlatform(0,0,3);
        this.createPlatform(300,randomRangeInt(this.generateAtHeightMin, this.generateAtHeightMax), 4);
        this.createPlatform(600,randomRangeInt(this.generateAtHeightMin, this.generateAtHeightMax), randomRangeInt(3,5));
    }

    update(deltaTime: number) {
        this.timer -= deltaTime;
        if (this.timer < 0) {
            this.timer = this.generateEvery;
            this.createPlatform(900,randomRangeInt(this.generateAtHeightMin, this.generateAtHeightMax),randomRangeInt(4,6));    
        }
    }

    createPlatform(x:number, y:number, tiles:number) {
        if (this.platforms.length < this.maxPlatformsInArray) {
            const platform = instantiate(this.platform);
            platform.getComponent(Platform).createPosition = new Vec3(x,y,0)
            platform.getComponent(Platform).tilesCount = tiles
            platform.getComponent(Platform).platformSpeed = this.movementSpeed
            platform.getComponent(Platform).init()
            this.node.addChild(platform);
            this.platforms[this.platformIndex] = platform;
        } else {
            this.platforms[this.platformIndex].position = new Vec3(x,y,0);
        }

        for (var i = 0; i < this.platforms[this.platformIndex].getComponent(Platform).tilesCount; ++i) {
            if (randomRangeInt(0,100) > this.percentToGenerateDiamondsInEachTile) {
                var tile = this.platforms[this.platformIndex].getComponent(Platform).node.children[i];
                const diamond = instantiate(this.diamond);
                diamond.getComponent(Diamond).diamondSpeed = this.movementSpeed
                diamond.getComponent(Diamond).createPosition = new Vec3(x + tile.position.x,
                                                                        y + tile.position.y + this.platforms[this.platformIndex].getComponent(Platform).totalHeight,
                                                                        0);
                diamond.getComponent(Diamond).init();
                this.node.addChild(diamond);
            }
        }

        this.platformIndex = (1+this.platformIndex) % this.maxPlatformsInArray;
    }
}

