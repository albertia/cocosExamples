import { _decorator, Component, Node } from 'cc';
import { LevelMechanicButton } from './LevelMechanicButton';
const { ccclass, property } = _decorator;

@ccclass('LevelMechanicBrowser')
export class LevelMechanicBrowser extends Component {

    @property({ type: Node })
    private levelMechanicContainerNode: Node | null = null;

    private levelMechanicButtons: LevelMechanicButton[];

    start() {
        this.levelMechanicButtons = this.node.getComponentsInChildren(LevelMechanicButton);

        for (const levelMechanicButton of this.levelMechanicButtons) {
            levelMechanicButton.init(this.levelMechanicContainerNode);
        }
    }

    update(deltaTime: number) {

    }
}