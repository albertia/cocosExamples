import { BoxCollider2D, Component, UITransform, _decorator } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('Laser')
@executeInEditMode(true)
export class Laser extends Component {

    @property(UITransform)
    private uiTransform: UITransform;

    @property(BoxCollider2D)
    private boxCollider2D: BoxCollider2D;

    @property(UITransform)
    private laserBodyUiTransform: UITransform;

    update(deltaTime: number) {
        this.boxCollider2D.size = this.uiTransform.contentSize;
        this.laserBodyUiTransform.contentSize = this.uiTransform.contentSize;
    }
}