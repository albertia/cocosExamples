import { Component, Node, Vec3, _decorator, director, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScreenTransition')
export class ScreenTransition extends Component {

    @property(Node)
    private coverNode: Node;

    public static instance: ScreenTransition;

    private isTransitioning: boolean;

    start() {
        ScreenTransition.instance = this;
        director.addPersistRootNode(this.node);
    }

    doTransition(callback: Function) {

        if (this.isTransitioning) {
            return;
        }

        this.isTransitioning = true;

        this.coverNode.position = new Vec3(-2420, 0, 0);

        let tw = tween(this.coverNode)
            .to(0.25, { position: new Vec3(0, 0, 0) }, { easing: 'linear' })
            .call(() => {
                callback();
            })
            .delay(0.2)
            .to(0.25, { position: new Vec3(2420, 0, 0) }, { easing: 'linear' })
            .call(() => {
                this.isTransitioning = false;
            })
            .start();
    }
}