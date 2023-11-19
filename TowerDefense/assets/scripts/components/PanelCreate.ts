import { _decorator, Component, Node, Vec3 } from 'cc';
import { TowerGenerator } from './TowerGenerator';
const { ccclass, property } = _decorator;

@ccclass('PanelCreate')
export class PanelCreate extends Component {
    
    public posToBeCreated: Vec3;
    public towerIndex: number;

    start() {

    }

    update(deltaTime: number) {
        
    }

    public init() {
        this.node.position = this.posToBeCreated;
        this.node.getComponentsInChildren(TowerGenerator).forEach(tg => {
            tg.positionToCreateTower = this.posToBeCreated;
            tg.towerIndex = this.towerIndex;
        });
    }

}

