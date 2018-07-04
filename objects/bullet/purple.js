const Default = require('./default.js');

module.exports = class extends Default {
  constructor(player, enemy, components, canvas) {
    super(player);
    this.positionX = player.positionX + (player.width / 2);
    this.positionY = player.positionY;
    this.enemyPositionX = enemy.positionX + (enemy.width / 2);
    this.enemyPositionY = enemy.positionY + (enemy.height / 2);
    this.controlPositionX = Math.floor(Math.random() * canvas.width);
    this.controlPositionY = Math.floor(Math.random() * canvas.height);
    this.reqKillTime = 500;
    this.targetEnemy = enemy;
    this.targetPlayer = player;
    if (enemy.stateTargetted === false) {
      components.enemies.targettedCount += 1;
    }
    enemy.stateTargetted = true;
  }
  update(time, boundary, components) {
    this.reqKillTime -= time;
    if (this.reqKillTime <= 0) {
      components.bullets.head = this.remove(components.bullets.head, components.bullets);
      components.player.score += 1;
      this.targetEnemy.stateHit = true;
    }
    this.movementUpdate();
  }
  canvasFill(context) {
    context.strokeStyle = 'mediumpurple';
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(this.positionX, this.positionY);
    context.quadraticCurveTo(
      this.controlPositionX, this.controlPositionY,
      this.enemyPositionX, this.enemyPositionY,
    );
    context.stroke();
  }
  movementUpdate() {
    this.enemyPositionX = this.targetEnemy.positionX + (this.targetEnemy.width / 2);
    this.enemyPositionY = this.targetEnemy.positionY + (this.targetEnemy.height / 2);
    this.positionX = this.targetPlayer.positionX + (this.targetPlayer.width / 2);
    this.positionY = this.targetPlayer.positionY;
  }
  append(head, bullets) {
    bullets.bulletCountPurple += 1;
    if (head == null) {
      return this;
    }
    for (let i = head; i != null; i = i.nextBullet) {
      if (i.nextBullet == null) {
        i.nextBullet = this;
        i = i.nextBullet;
      }
    }
    return head;
  }
  remove(head, bullets) {
    bullets.bulletCountPurple -= 1;
    if (head === this) {
      return head.nextBullet;
    }
    for (let i = head; i.nextBullet != null; i = i.nextBullet) {
      if (i.nextBullet === this) {
        i.nextBullet = i.nextBullet.nextBullet;
      }
      if (i.nextBullet == null) {
        return head;
      }
    }
    return head;
  }
};
