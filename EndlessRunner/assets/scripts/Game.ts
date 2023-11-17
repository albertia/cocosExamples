import { _decorator, AudioClip, AudioSource, Component, director, EPhysics2DDrawFlags, Node, PhysicsSystem2D, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {
    public score:number = 0;

    @property(Node)
    public hero:Node;
    @property(Node)
    public scoreNode:Node;
    @property(AudioClip)
    public diamondSound:AudioClip;
    @property(AudioClip)
    public dieSound:AudioClip;

    private diamondSoundSource:AudioSource;
    private dieSoundSource:AudioSource;

    start() {
        /*
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
        EPhysics2DDrawFlags.Pair |
        EPhysics2DDrawFlags.CenterOfMass |
        EPhysics2DDrawFlags.Joint |
        EPhysics2DDrawFlags.Shape;
    */
        this.diamondSoundSource = new AudioSource()
        this.diamondSoundSource.clip = this.diamondSound;
        this.dieSoundSource = new AudioSource()
        this.dieSoundSource.clip = this.dieSound;

        this.score= 0;
        localStorage.setItem("score", JSON.stringify(this.score));
        const scoreNodeComponent = this.scoreNode.getComponent(RichText);
        this.hero.on('score', () => {
            this.diamondSoundSource.play();
            ++this.score;
            scoreNodeComponent.string = this.score.toString();
            localStorage.setItem("score", JSON.stringify(this.score));
        });
        this.hero.once('die', () => {
            this.dieSoundSource.play();
            setTimeout(function () {
                director.loadScene("Score");
              }.bind(this), 1005); // 1 sec to allow sound to Finish
        });
    }

    update(deltaTime: number) {
        
    }
}

