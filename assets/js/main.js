import Preloader from './scenes/preloader.js';
import Level1 from './scenes/level-1.js';
import Level2 from './scenes/level-2.js';

const config = {
  type: Phaser.AUTO,
  width: 2880,
  height: 1200,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [Preloader, Level1, Level2],
};

let game = new Phaser.Game(config);


