import createArthurAnims from '../anims/arthur.js';

export default class Level1 extends Phaser.Scene {
  gameOver = false;

  constructor() {
    super('level-1');
  }

  create() {
    this.add.image(1440, 600, 'background');
    this.add.image(1440, 900, 'sun');
    this.add.image(2340, 500, 'birds');
    this.add.image(1480, 400, 'cloud');
    this.add.image(1280, 940, 'mountain_1');
    this.add.image(2480, 1000, 'mountain_2a');
    this.add.image(380, 1000, 'mountain_2b');
    this.add.image(280, 1080, 'mountain_3a');
    this.add.image(2480, 1020, 'mountain_3b');
    this.add.image(2280, 1050, 'farm');
    this.add.image(2780, 1030, 'roadsign');
    this.add.image(2080, 1000, 'carriage');
    this.add.image(180, 950, 'tent');
    this.add.image(880, 980, 'bg_horse');
    this.add.image(1580, 660, 'tree');
    this.add.image(1580, 1150, 'ground');

    //arthur run
    createArthurAnims(this.anims);

    this.arthur_run = this.add.sprite(800, 995, 'arthur_run');
    this.arthur_run.play('arthur_run');

    // arthur shot
    this.add.image(500, 970, 'arthur_shot_body');
    // this.arthur_shot_arm = this.add.image(455, 880, 'arthur_shot_arm');
    // this.arthur_shot_arm.setOrigin(0, 0);

    // this.aimLine = this.add.graphics({
    //   lineStyle: { width: 4, color: 0xaa00aa },
    //   fillStyle: { color: 0x0000aa },
    // });

    // this.lines = [new Phaser.Geom.Line(470, 870, 680, 900)];

    // this.points = [this.lines[0].getPointA(), { x: 550, y: 900 }];

    this.fireLine = this.add.sprite(450, 870, 'fireline');
    this.fireLine.setOrigin(0, 0);
    this.fireLine.displayWidth = 700;
    this.fireLine.displayHeight = 8;
    this.fireLine.visible = false;
    // the rotating gun
    this.gun = this.add.sprite(450, 870, 'arthur_shot_arm');
    this.gun.setOrigin(0, 0);

    this.gunTween = this.tweens.add({
      targets: [this.gun],
      angle: 360,
      duration: 5000,
      repeat: -1,
      callbackScope: this,
      // onRepeat: function () {
      //   // each round, gun angular speed decreases
      //   this.gunTween.timeScale = Math.max(1, this.gunTween.timeScale * 0.9);
      // },
    });
    this.input.on(
      'pointerdown',
      function (pointer) {
        // we say we can fire when the fire line is not visible
        if (!this.fireLine.visible) {
          this.fireLine.visible = true;
          this.fireLine.angle = this.gun.angle + 20;

          this.time.addEvent({
            delay: 50,
            callbackScope: this,
            callback: function () {
              this.fireLine.visible = false;
            },
          });

          // gun angular speed increases
          // this.gunTween.timeScale = Math.min(
          //   15,
          //   this.gunTween.timeScale * 2
          // );

          // fire line disappears after 50 milliseconds

          let radians = Phaser.Math.DegToRad(this.fireLine.angle);
          let fireStartX = 455;
          let fireStartY = 800;
          let fireEndX = fireStartX + 800 * Math.cos(radians);
          let fireEndY = fireStartY + 800 * Math.sin(radians);
          let lineOfFire = new Phaser.Geom.Line(
            fireStartX,
            fireStartY,
            fireEndX,
            fireEndY
          );
        }
      },
      this
    );
  }

  update() {
    // fire bullet
    // this.aimLine.clear();
    // for (var i = 0; i < this.lines.length; i++) {
    //   Phaser.Geom.Line.RotateAroundPoint(this.lines[i], this.points[i], 0.01);
    //   this.aimLine.strokeLineShape(this.lines[i]);
    //   this.aimLine.fillPointShape(this.points[i], 10);
    //   this.arthur_shot_arm.rotation += 0.01;
    // }
  }
}
