export default class UIHandler {
    constructor(scene) {
        this.buildGameText = () => {
            scene.dealCards = scene.add.text(960, 445, 'Deal Cards').setFontSize(20).setFontFamily('Arial');
        };
        this.buildUI = () => {
            this.buildGameText();
        }
     }
    }