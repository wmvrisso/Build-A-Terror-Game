import CardHandler from '..//helpers/CardHandler';
import DeckHandler from '..//helpers/DeckHandler';
import PlayerHandler from '..//helpers/PlayerHandler';
import SocketHandler from '..//helpers/SocketHandler';
import BattleHandler from '../helpers/BattleHandler';
import ZoneHandler from '../helpers/ZoneHandler';
import { Scene } from 'phaser';

export class Battle extends Scene {
    constructor() {
        super("Game");
    }

    create() {
        this.CardHandler = new CardHandler();
        this.DeckHandler = new DeckHandler(this);
        this.PlayerHandler = new PlayerHandler(this);
        this.SocketHandler = new SocketHandler(this);
        this.BattleHandler = new BattleHandler(this);
        this.ZoneHandler = new ZoneHandler(this);

        this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(512, 384, "background").setAlpha(0.5);

        this.add
            .text(512, 384, "Here is how to play", {
                fontFamily: "Arial Black",
                fontSize: 38,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5);

        this.input.once("pointerdown", () => {
            this.scene.start("GameOver");
        });
    }
}

