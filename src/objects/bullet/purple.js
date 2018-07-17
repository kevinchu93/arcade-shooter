const Default = require('./default.js');

module.exports = class extends Default {
  constructor(game, player, enemy) {
    super(game, player);
    this.positionX = player.positionX + (game.player.width / 2);
    this.positionY = player.positionY;
    this.enemyPositionX = enemy.positionX + (enemy.width / 2);
    this.enemyPositionY = enemy.positionY + (enemy.height / 2);
    this.controlPositionX = Math.floor(Math.random() * game.canvas.width);
    this.controlPositionY = Math.floor(Math.random() * game.canvas.height);
    this.reqKillTime = 500;
    this.targetEnemy = enemy;
    this.targetPlayer = player;
    if (enemy.stateTargetted === false) {
      game.enemies.targettedCount += 1;
    }
    enemy.stateTargetted = true;
  }
  update() {
    if (this.removeFromGame === true) {
      this.game.bullets.head = this.remove();
    }
    this.movement();
    this.killCheck();
  }
  killCheck() {
    this.reqKillTime -= this.game.timer.deltaTime;
    if (this.reqKillTime <= 0) {
      this.removeFromGame = true;
      this.targetEnemy.removeFromGame = true;
      this.game.player.score += 1;
    }
  }

  draw() {
    this.game.canvasContext.strokeStyle = 'mediumpurple';
    this.game.canvasContext.lineWidth = 2;
    this.game.canvasContext.lineCap = 'round';
    this.game.canvasContext.beginPath();
    this.game.canvasContext.moveTo(this.positionX, this.positionY);
    this.game.canvasContext.quadraticCurveTo(
      this.controlPositionX, this.controlPositionY,
      this.enemyPositionX, this.enemyPositionY,
    );
    this.game.canvasContext.stroke();
  }
  movement() {
    this.enemyPositionX = this.targetEnemy.positionX + (this.targetEnemy.width / 2);
    this.enemyPositionY = this.targetEnemy.positionY + (this.targetEnemy.height / 2);
    this.positionX = this.targetPlayer.positionX + (this.targetPlayer.width / 2);
    this.positionY = this.targetPlayer.positionY;
  }
  append() {
    this.game.bullets.bulletCountPurple += 1;
    if (this.game.bullets.head == null) {
      return this;
    }
    for (let i = this.game.bullets.head; i != null; i = i.nextBullet) {
      if (i.nextBullet == null) {
        i.nextBullet = this;
        i = i.nextBullet;
      }
    }
    return this.game.bullets.head;
  }
  remove() {
    this.game.bullets.bulletCountPurple -= 1;
    if (this.game.bullets.head === this) {
      return this.game.bullets.head.nextBullet;
    }
    for (let i = this.game.bullets.head; i.nextBullet != null; i = i.nextBullet) {
      if (i.nextBullet === this) {
        i.nextBullet = i.nextBullet.nextBullet;
      }
      if (i.nextBullet == null) {
        return this.game.bullets.head;
      }
    }
    return this.game.bullets.head;
  }
};
