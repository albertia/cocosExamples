import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelMechanicButton')
export class LevelMechanicButton extends Component {

    @property({ type: Node })
    public levelMechanicContainerNode: Node | null = null;

    @property({ type: Prefab })
    public placeholderPrefab: Prefab | null = null;

    start() {
    }

    update(deltaTime: number) {

    }

    onButtonPressed() {
        var placeholderPrefabInstance = instantiate(this.placeholderPrefab);
        placeholderPrefabInstance.setParent(this.levelMechanicContainerNode);
    }
}


