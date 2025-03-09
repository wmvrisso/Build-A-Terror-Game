import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import GameScene from "../phaser/GameScene";

const PhaserGame = () => {
  const gameContainer = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: gameContainer.current,
      width: 800,
      height: 600,
      scene: [GameScene]
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameContainer} />;
};

export default PhaserGame;
