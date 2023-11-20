import { _decorator, Component, instantiate, Node, NodeEventType, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('OmNomBubble')
export class OmNomBubble extends Component {
    @property(Prefab)
    public omnomPrefab:Prefab;
    @property(Node)
    public gameNode:Node;

    start() {
        this.node.on(NodeEventType.TOUCH_END, this.startGame, this);

    }

    update(deltaTime: number) {
        
    }

    public startGame() {
        const omnom = instantiate(this.omnomPrefab);
        omnom.position = this.node.position;
        this.gameNode.addChild(omnom);
        this.node.destroy();
    }

}

