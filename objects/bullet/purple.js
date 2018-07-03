const Default = require('./default.js');

module.exports = class extends Default {
  constructor(player, enemy, components) {
    super(player);
    this.positionHorizontal = player.positionHorizontal + (player.width / 2);
    this.positionVertical = player.positionVertical;
    this.displayTime = 500;
    this.enemyPositionHorizontal = enemy.positionHorizontal + (enemy.width / 2);
    this.enemyPositionVertical = enemy.positionVertical + (enemy.height / 2);
    this.controlPositionHorizontal = Math.floor(Math.random() * 1300);
    this.controlPositionVertical = Math.floor(Math.random() * 800);
    this.targetEnemy = enemy;
    this.targetPlayer = player;
    if (enemy.targettedState == false) {
      components.enemies.targettedCount += 1;
    }
    enemy.targettedState = true;
  }
  update(timeElapsed, boundary, components, Bullet) {
    this.displayTime -= timeElapsed;
    if (this.displayTime <= 0) {
      components.bullets.head = super.remove(components.bullets.head);
      components.player.score += 1;
      this.targetEnemy.hitState = true;
    }
    this.movementUpdate();
  }
  canvasFill(drawingContext) {
    drawingContext.strokeStyle = 'mediumpurple';
    drawingContext.lineWidth = 2;
    drawingContext.lineCap = 'round';
    drawingContext.beginPath();
    drawingContext.moveTo(this.positionHorizontal, this.positionVertical);
    drawingContext.quadraticCurveTo(
      this.controlPositionHorizontal,
      this.controlPositionVertical,
      this.enemyPositionHorizontal,
      this.enemyPositionVertical,
    );
    drawingContext.stroke();
  }
  movementUpdate() {
    this.enemyPositionHorizontal = this.targetEnemy.positionHorizontal +
      (this.targetEnemy.width / 2);
    this.enemyPositionVertical = this.targetEnemy.positionVertical + (this.targetEnemy.height / 2);
    this.positionHorizontal = this.targetPlayer.positionHorizontal + (this.targetPlayer.width / 2);
    this.positionVertical = this.targetPlayer.positionVertical;
  }
};
