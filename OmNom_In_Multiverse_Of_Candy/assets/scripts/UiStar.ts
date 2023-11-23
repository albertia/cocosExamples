import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UiStar')
export class UiStar extends Component {
    @property(Node)
    private collectedNode: Node;

    @property(Node)
    private emptyNode: Node;

    setState(isCollected: boolean) {
        this.collectedNode.active = isCollected;
        this.emptyNode.active = !isCollected;
    }
}


