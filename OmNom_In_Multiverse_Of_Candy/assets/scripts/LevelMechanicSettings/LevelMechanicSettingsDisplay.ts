import { _decorator, Button, Component, Quat, Vec3 } from 'cc';
import { LevelMechanic } from '../LevelMechanics/LevelMechanic';
const { ccclass, property } = _decorator;

// Potentially use the level mechanic bounds in the future rather than a magic value
const verticalOffset: number = -75;

@ccclass('LevelMechanicSettingsDisplay')
export class LevelMechanicSettingsDisplay extends Component {

    @property({ type: Button })
    private changeColorButton: Button;

    @property({ type: Button })
    private rotateButton: Button;

    private levelMechanic: LevelMechanic = null;
    private displayPosition: Vec3;

    start() {

    }

    update(deltaTime: number) {
        this.updatePosition();
    }

    setActive(isActive: boolean) {
        this.node.active = isActive;
    }

    show(levelMechanic: LevelMechanic) {
        this.levelMechanic = levelMechanic;

        this.updatePosition();
        this.setActive(true);

        this.changeColorButton.interactable = levelMechanic.canChangeColor;
        this.rotateButton.interactable = levelMechanic.canRotate;
    }

    updatePosition() {
        this.displayPosition = this.levelMechanic.node.position.clone().add3f(0, verticalOffset, 0);
        this.node.setPosition(this.displayPosition);
    }

    onDeleteMechanic() {
        this.levelMechanic.node.destroy();
        this.levelMechanic = null;
        this.setActive(false);
    }

    onChangeColorMechanic() {
        this.levelMechanic.changeColor();
    }

    onRotateMechanic() {
        let rotateQuaternion = new Quat();
        Quat.fromEuler(rotateQuaternion, 0, 0, -45);
        this.levelMechanic.node.rotate(rotateQuaternion);
    }
}


