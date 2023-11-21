import { Component, _decorator } from 'cc';
import { PortalMechanic } from './PortalMechanic';
const { ccclass, property } = _decorator;

@ccclass('LevelMechanicManager')
export class LevelMechanicManager extends Component {

    public static portalMechanics: PortalMechanic[] = [];

    static registerPortalMechanic(portalMechanic: PortalMechanic) {
        this.portalMechanics.push(portalMechanic);
    }

    static unregisterPortalMechanic(portalMechanic: PortalMechanic) {
        for (let i = 0; i < this.portalMechanics.length; i++) {
            if (this.portalMechanics[i] == portalMechanic) {
                this.portalMechanics.splice(i, 1);
                return;
            }
        }
    }

    static getConnectedPortals(portalMechanic: PortalMechanic) {
        let connectedPortals: PortalMechanic[] = [];

        for (let currentPortal of this.portalMechanics) {
            if (currentPortal != portalMechanic && currentPortal.levelMechanicColor == portalMechanic.levelMechanicColor) {
                connectedPortals.push(currentPortal)
            }
        }

        return connectedPortals;
    }
}


