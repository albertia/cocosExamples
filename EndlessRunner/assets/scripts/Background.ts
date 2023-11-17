import { _decorator, Component, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Background')
export class Background extends Component {

    @property
    public speedMovement:number = 150;

    start() {

    }

    update(deltaTime: number) {
        this.node.children.forEach(node => {
            this.move(node, deltaTime * this.speedMovement);
        });
    }

    move(node:Node, offset:number) {
        // find the X coord of the right edge of the current bck node sprite
        const spriteRightX = node.position.x + node.getComponent(UITransform).width / 2;
        // find the X coord of the left edge of the screen - or just be sure with some easy calc, one the image has moved a lot and enough
        const screenLeftX = -node.getComponent(UITransform).width * 1.1;
        if (spriteRightX <= screenLeftX) {
            // Move image to right, 2 images length
            node.position = new Vec3(node.position.x + node.getComponent(UITransform).width * 3 - offset, node.position.y, node.position.z);
        } else {
            // just move bck node
            node.position = new Vec3(node.position.x - offset, node.position.y, node.position.z);
        }
    }
}

