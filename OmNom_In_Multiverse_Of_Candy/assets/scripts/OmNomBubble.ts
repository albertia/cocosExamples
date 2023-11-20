import { _decorator, Component, instantiate, Node, NodeEventType, Prefab, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('OmNomBubble')
export class OmNomBubble extends Component {
    @property(Prefab)
    public omnomPrefab:Prefab;
    @property(Node)
    public gameNode:Node;

    private bubbleMoved = false;

    start() {
        this.node.on(NodeEventType.TOUCH_START, this.startDrag, this);
        this.node.on(NodeEventType.TOUCH_MOVE, this.moveBubble, this);
        this.node.on(NodeEventType.TOUCH_END, this.startGame, this);

    }

    update(deltaTime: number) {
        
    }

    startDrag() {
        this.bubbleMoved = false;
    }

    moveBubble(event) {
        this.bubbleMoved = true;
        var moved:Vec2 = event.getUIDelta();
        this.node.position = new Vec3(this.node.position.x + moved.x, this.node.position.y + moved.y)
    }


    startGame() {
        if (!this.bubbleMoved) {
            const omnom = instantiate(this.omnomPrefab);
            omnom.position = this.node.position;
            this.gameNode.addChild(omnom);
            this.node.destroy();
        }
    }

}

