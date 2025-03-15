export default class ZoneHandler {
    constructor(scene) {
        this.scene = scene; // Store scene reference
    }

    renderZone(x, y) {
        const dropZone = this.scene.add.zone(x, y, 850, 230).setRectangleDropZone(850, 230);
        dropZone.setData({ cards: 0 });
        return dropZone;
    }

    renderOutline(dropZone) {
        const dropZoneOutline = this.scene.add.graphics();
        dropZoneOutline.lineStyle(1, 0x1a65ac);
        dropZoneOutline.strokeRect(
            dropZone.x - dropZone.input.hitArea.width / 2,
            dropZone.y - dropZone.input.hitArea.height / 2,
            dropZone.input.hitArea.width,
            dropZone.input.hitArea.height
        );
    }
}
