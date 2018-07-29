module.exports = class {
  constructor(game, player) {
    this.game = game;
    this.playerId = player.socketId;
    this.width = 5;
    this.height = 10;
    this.speed = 20;
    this.positionX = player.positionX + ((player.width - this.width) / 2);
    this.positionY = player.positionY;
    this.type = player.bulletType;
    this.nextBullet = null;
    this.removeFromGame = false;
  }
  movement(time) {
    this.positionY -= this.speed * (time / (1000 / 60));
  }
  boundaryCheck() {
    if (this.positionY + this.height <= 0) {
      this.removeFromGame = true;
    }
  }
  update(time) {
    this.boundaryCheck();
    this.movement(time);
    this.hitCheck();
  }
  draw() {
    this.game.canvasContext.fillStyle = this.type;
    this.game.canvasContext.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
  }
  hitCheck() {
    const Ax1 = this.positionX;
    const Ax2 = this.positionX + this.width;
    const Ay1 = this.positionY;
    const Ay2 = this.positionY + this.height;
    for (let i = 0; i < this.game.enemies.entities.length; i += 1) {
      const enemy = this.game.enemies.entities[i];
      if (enemy.removeFromGame === false) {
        const Bx1 = enemy.positionX;
        const Bx2 = enemy.positionX + enemy.width;
        const By1 = enemy.positionY;
        const By2 = enemy.positionY + enemy.height;
        if (this.constructor.rectangleCollision(Ax1, Ax2, Ay1, Ay2, Bx1, Bx2, By1, By2)) {
          enemy.removeFromGame = true;
          this.game.players.entities[this.playerId].score += 1;
          this.removeFromGame = true;
        }
      }
    }
  }
  static rectangleCollision(Ax1, Ax2, Ay1, Ay2, Bx1, Bx2, By1, By2) {
    if (
      (Ax1 >= Bx1 && Ax1 <= Bx2 && Ay1 >= By1 && Ay1 <= By2) ||
      (Ax2 >= Bx1 && Ax2 <= Bx2 && Ay1 >= By1 && Ay1 <= By2) ||
      (Ax1 >= Bx1 && Ax1 <= Bx2 && Ay2 >= By1 && Ay2 <= By2) ||
      (Ax2 >= Bx1 && Ax2 <= Bx2 && Ay2 >= By1 && Ay2 <= By2) ||
      (Bx1 >= Ax1 && Bx1 <= Ax2 && By1 >= Ay1 && By1 <= Ay2) ||
      (Bx2 >= Ax1 && Bx2 <= Ax2 && By1 >= Ay1 && By1 <= Ay2) ||
      (Bx1 >= Ax1 && Bx1 <= Ax2 && By2 >= Ay1 && By2 <= Ay2) ||
      (Bx2 >= Ax1 && Bx2 <= Ax2 && By2 >= Ay1 && By2 <= Ay2)
    ) {
      return true;
    }
    return false;
  }
  getState() {
    let state = {};
    Object.keys(this).forEach((key) => {
      if (['game', 'nextBullet', 'targetEnemy', 'targetPlayer'].indexOf(key) === -1) {
        state = { ...state, ...{ [key]: this[key] } };
      }
    });
    return state;
  }
};
