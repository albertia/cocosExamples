import { _decorator, Component, instantiate, Node, Prefab, Sprite, SpriteFrame } from 'cc';
import { Enemy } from './Enemy';
const { ccclass, property } = _decorator;

@ccclass('EnemyGenerator')
export class EnemyGenerator extends Component {
    @property
    public timeBetweenWaves = 30;
    @property
    public timeBetweenEnemies = 1;
    @property
    public numberOfWaves = 1;
    @property
    public enemiesPerWave = 1;
    @property(Node)
    public levelMapNode:Node;
    @property(Prefab)
    public enemyPrefab:Prefab;
    @property(SpriteFrame)
    public easyEnemySprite:SpriteFrame;
    @property(SpriteFrame)
    public midEnemySprite:SpriteFrame;
    @property(SpriteFrame)
    public hardEnemySprite:SpriteFrame;

    private timer:number = 45;
    private phase = 0;
    private wave = 0;
    private enemiesSpawn = 0;
    private enemiesHealthMultiplier = 1;
    // Phase 0 = Wait
    // Phase 1 = SpawnEnemies


    start() {

    }

    update(deltaTime: number) {
        this.timer += deltaTime;
        if (this.phase == 0) {
            if (this.timer >= this.timeBetweenWaves) {
                this.phase = 1;
                this.timer = this.timeBetweenEnemies;
            }
        } else if (this.phase == 1){
            if (this.timer >= this.timeBetweenEnemies) {
                // Spawn Enemy
                const enemy = instantiate(this.enemyPrefab);
                switch(this.wave) {
                    case 0: 
                        enemy.getComponent(Enemy).spriteToUse = this.easyEnemySprite;
                        break;
                    case 1: 
                        enemy.getComponent(Enemy).spriteToUse = this.midEnemySprite;
                        break;
                    case 2:
                    default:
                        enemy.getComponent(Enemy).spriteToUse = this.hardEnemySprite;
                        break;
                }
                enemy.getComponent(Enemy).levelMapNode = this.levelMapNode;
                switch(this.wave) {
                    case 0: 
                        enemy.getComponent(Enemy).health = 50;
                        break;
                    case 1: 
                        enemy.getComponent(Enemy).health = 100;
                        break;
                    case 2:
                    default:
                        enemy.getComponent(Enemy).health = 200 * this.enemiesHealthMultiplier;
                        break;
                }
                enemy.getComponent(Enemy).init();
                this.node.addChild(enemy);
                this.enemiesSpawn++;
                this.timer = 0;
            }
            if (this.enemiesSpawn >= this.enemiesPerWave) {
                this.enemiesSpawn = 0;
                this.phase = 0;
                this.wave++;
                if (this.wave >= 3) {
                    this.timeBetweenEnemies *= 0.95;
                    this.enemiesPerWave = Math.ceil(this.enemiesPerWave * 1.2);
                    this.enemiesHealthMultiplier = this.enemiesHealthMultiplier * 1.1;
                }
            }
        }
    }
}

