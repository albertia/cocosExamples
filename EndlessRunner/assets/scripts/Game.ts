import { _decorator, Component, director, EPhysics2DDrawFlags, Node, PhysicsSystem2D, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    public score:number = 0;

    @property(Node)
    public hero:Node;
    @property(Node)
    public scoreNode:Node;

    start() {
        /*
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
        EPhysics2DDrawFlags.Pair |
        EPhysics2DDrawFlags.CenterOfMass |
        EPhysics2DDrawFlags.Joint |
        EPhysics2DDrawFlags.Shape;
    */
        this.score= 0;
        localStorage.setItem("score", JSON.stringify(this.score));
        const scoreNodeComponent = this.scoreNode.getComponent(RichText);
        this.hero.on('score', () => {
            //audioEngine.play(this.sound);
            ++this.score;
            scoreNodeComponent.string = this.score.toString();
            localStorage.setItem("score", JSON.stringify(this.score));
        });
        this.hero.once('die', () => {
            //audioEngine.play(this.sound);
            director.loadScene("Score");
        });
    }

    update(deltaTime: number) {
        
    }
}

