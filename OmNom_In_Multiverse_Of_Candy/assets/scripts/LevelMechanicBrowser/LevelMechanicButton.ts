import { Component, Node, Prefab, _decorator, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelMechanicButton')
export class LevelMechanicButton extends Component {
    @property({ type: Prefab })
    private placeholderPrefab: Prefab | null = null;

    private _levelMechanicContainerNode: Node | null = null;

    start() {
    }

    update(deltaTime: number) {

    }

    init(levelMechanicContainerNode: Node) {
        this._levelMechanicContainerNode = levelMechanicContainerNode;
    }

    onButtonPressed() {
        var placeholderPrefabInstance = instantiate(this.placeholderPrefab);
        placeholderPrefabInstance.setParent(this._levelMechanicContainerNode);
    }
}


