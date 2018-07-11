(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { blue } = require('./config.js');

module.exports = {
  config: blue,
  createBlue(player, Bullet) {
    let bullet = {};
    switch (player.bulletLevel) {
      case 1:
        bullet = new Bullet.Blue(
          player,
          this.config.level1.width,
          this.config.level1.height,
        );
        break;
      case 2:
        bullet = new Bullet.Blue(
          player,
          this.config.level2.width,
          this.config.level2.height,
        );
        break;
      case 3:
        bullet = new Bullet.Blue(
          player,
          this.config.level3.width,
          this.config.level3.height,
        );
        break;
      case 4:
        bullet = new Bullet.Blue(
          player,
          this.config.level4.width,
          this.config.level4.height,
        );
        break;
      case 5:
        bullet = new Bullet.Blue(
          player,
          this.config.level5.width,
          this.config.level5.height,
        );
        break;
      default:
        break;
    }
    return bullet;
  },
};

},{"./config.js":2}],2:[function(require,module,exports){
module.exports = {
  blue: {
    level1: {
      width: 5,
      height: 20,
    },
    level2: {
      width: 7,
      height: 20,
    },
    level3: {
      width: 10,
      height: 20,
    },
    level4: {
      width: 25,
      height: 20,
    },
    level5: {
      width: 30,
      height: 20,
    },
  },
  red: {
    level1: {
      offset: 10,
    },
    level2: {
      offset: 20,
    },
    level3: {
      offset: 20,
      angle: 0.1,
    },
    level4: {
      offset: 20,
      angleInner: 0.1,
      angleOuter: 0.2,
    },
    level5: {
      offset: 20,
      angleInner: 0.1,
      angleMiddle: 0.2,
      angleOuter: 0.3,
    },
  },
  purple: {
    level1: {
      maxBullets: 1,
    },
    level2: {
      maxBullets: 2,
    },
    level3: {
      maxBullets: 3,
    },
    level4: {
      maxBullets: 6,
    },
    level5: {
      maxBullets: 100,
    },
  },
};

},{}],3:[function(require,module,exports){
const config = require('./config.js');
const blue = require('./blue.js');
const red = require('./red.js');
const purple = require('./purple.js');

module.exports = {
  config,
  bulletCount: 0,
  bulletCountPurple: 0,
  head: null,
  canvasFill(gameArea) {
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.canvasFill(gameArea.canvasContext);
    }
    gameArea.canvasContext.fillText(this.bulletCountPurple, 400, 55);
  },
  update(time, boundary, components, Bullet, canvas) {
    if (components.keyMap[13] === true) {
      this.create(components, Bullet, canvas);
    }
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.update(time, boundary, components, Bullet);
    }
  },
  create(components, Bullet, canvas) {
    let bullet = {};
    switch (components.player.bulletType) {
      case 'white':
        bullet = new Bullet.Default(components.player);
        this.appendList(bullet, components);
        break;
      case 'orangered': {
        const emptyArray = [];
        const bulletArray = red.createRed(components.player, Bullet, emptyArray);
        for (let i = 0; bulletArray[i] != null; i += 1) {
          this.appendList(bulletArray[i], components);
        }
        break;
      }
      case 'deepskyblue':
        bullet = blue.createBlue(components.player, Bullet);
        this.appendList(bullet, components);
        break;
      case 'mediumpurple':
        bullet = purple.createPurple(components, Bullet, canvas);
        if (bullet != null) {
          this.appendList(bullet, components);
        }
        break;
      default:
        bullet = new Bullet.Default(components.player);
        this.appendList(bullet, components);
    }
  },
  appendList(bullet, components) {
    components.bullets.head = bullet.append(components.bullets.head, components.bullets);
  },
};

},{"./blue.js":1,"./config.js":2,"./purple.js":4,"./red.js":5}],4:[function(require,module,exports){
const { purple } = require('./config.js');

module.exports = {
  config: purple,
  createPurple(components, Bullet, canvas) {
    function checkStateTargetted(enemyHead) {
      let enemy = enemyHead;
      const nonTargettedEnemyCount = Math.floor(Math.random() *
        (components.enemies.count - components.enemies.targettedCount));
      while (enemy != null && enemy.stateTargetted === true) {
        enemy = enemy.nextEnemy;
      }
      if (enemy == null || nonTargettedEnemyCount === -1) { // no enemies with stateTargetted: false
        return null;
      } else if (nonTargettedEnemyCount === 0) { // 1 enemy with stateTargetted: false
        return enemy;
      }
      for (let i = 0; i < nonTargettedEnemyCount; i += 1) { // > 1 enemy with stateTargetted: false
        enemy = enemy.nextEnemy;
        while (enemy.stateTargetted !== false) {
          enemy = enemy.nextEnemy;
        }
      }
      return enemy;
    }
    const enemy = checkStateTargetted(components.enemies.head);
    switch (components.player.bulletLevel) {
      case 1:
        if (
          enemy == null ||
          components.bullets.bulletCountPurple >= this.config.level1.maxBullets
        ) {
          return null;
        }
        break;
      case 2:
        if (
          enemy == null ||
          components.bullets.bulletCountPurple >= this.config.level2.maxBullets
        ) {
          return null;
        }
        break;
      case 3:
        if (
          enemy == null ||
          components.bullets.bulletCountPurple >= this.config.level3.maxBullets
        ) {
          return null;
        }
        break;
      case 4:
        if (
          enemy == null ||
          components.bullets.bulletCountPurple >= this.config.level4.maxBullets
        ) {
          return null;
        }
        break;
      case 5:
        if (
          enemy == null ||
          components.bullets.bulletCountPurple >= this.config.level5.maxBullets
        ) {
          return null;
        }
        break;
      default:
        break;
    }
    return new Bullet.Purple(components.player, enemy, components, canvas);
  },
};

},{"./config.js":2}],5:[function(require,module,exports){
const { red } = require('./config.js');

module.exports = {
  config: red,
  createRed(player, Bullet, bulletArray) {
    switch (player.bulletLevel) {
      case 1:
        bulletArray[0] = new Bullet.Red(player, -this.config.level1.offset);
        bulletArray[1] = new Bullet.Red(player, this.config.level1.offset);
        break;
      case 2:
        bulletArray[0] = new Bullet.Red(player, -this.config.level2.offset);
        bulletArray[1] = new Bullet.Red(player, 0);
        bulletArray[2] = new Bullet.Red(player, this.config.level2.offset);
        break;
      case 3:
        bulletArray[0] = new Bullet.RedAngled(
          player,
          -this.config.level3.offset,
          -this.config.level3.angle,
        );
        bulletArray[1] = new Bullet.Red(player, -this.config.level3.offset);
        bulletArray[2] = new Bullet.Red(player, 0);
        bulletArray[3] = new Bullet.Red(player, this.config.level3.offset);
        bulletArray[4] = new Bullet.RedAngled(
          player,
          this.config.level3.offset,
          this.config.level3.angle,
        );
        break;
      case 4:
        bulletArray[0] = new Bullet.RedAngled(
          player,
          -this.config.level4.offset,
          -this.config.level4.angleOuter,
        );
        bulletArray[1] = new Bullet.RedAngled(
          player,
          -this.config.level4.offset,
          -this.config.level4.angleInner,
        );
        bulletArray[2] = new Bullet.Red(player, -this.config.level4.offset);
        bulletArray[3] = new Bullet.Red(player, 0);
        bulletArray[4] = new Bullet.Red(player, this.config.level4.offset);
        bulletArray[5] = new Bullet.RedAngled(
          player,
          this.config.level4.offset,
          this.config.level4.angleInner,
        );
        bulletArray[6] = new Bullet.RedAngled(
          player,
          this.config.level4.offset,
          this.config.level4.angleOuter,
        );
        break;
      case 5:
        bulletArray[0] = new Bullet.RedAngled(
          player,
          -this.config.level5.offset,
          -this.config.level5.angleOuter,
        );
        bulletArray[1] = new Bullet.RedAngled(
          player,
          -this.config.level5.offset,
          -this.config.level5.angleMiddle,
        );
        bulletArray[2] = new Bullet.RedAngled(
          player,
          -this.config.level5.offset,
          -this.config.level5.angleInner,
        );
        bulletArray[3] = new Bullet.Red(player, -this.config.level5.offset);
        bulletArray[4] = new Bullet.Red(player, 0);
        bulletArray[5] = new Bullet.Red(player, this.config.level5.offset);
        bulletArray[6] = new Bullet.RedAngled(
          player,
          this.config.level5.offset,
          this.config.level5.angleInner,
        );
        bulletArray[7] = new Bullet.RedAngled(
          player,
          this.config.level5.offset,
          this.config.level5.angleMiddle,
        );
        bulletArray[8] = new Bullet.RedAngled(
          player,
          this.config.level5.offset,
          this.config.level5.angleOuter,
        );
        break;
      default:
        break;
    }
    return bulletArray;
  },
};

},{"./config.js":2}],6:[function(require,module,exports){
module.exports = {
  head: null,
  count: 0,
  targettedCount: 0,
  spawn: {
    countdown: 1000,
    rate: 1000,
  },
  canvasFill(gameArea) {
    for (let i = this.head; i != null; i = i.nextEnemy) {
      i.canvasFill(gameArea.canvasContext);
    }
    gameArea.canvasContext.fillText(this.count, 100, 55);
  },
  update(time, boundaryLeft, boundaryRight, components, Enemy) {
    this.spawnUpdate(time, components, Enemy);
    for (let i = this.head; i != null; i = i.nextEnemy) {
      i.update(time, boundaryLeft, boundaryRight, components);
    }
  },
  spawnUpdate(time, components, Enemy) {
    components.enemies.spawn.countdown -= time;
    if (components.enemies.spawn.countdown <= 0) {
      components.enemies.spawn.countdown += components.enemies.spawn.rate;
      const enemy = this.create(Enemy);
      this.appendList(components, enemy);
    }
  },
  create(Enemy) {
    return new Enemy();
  },
  appendList(components, enemy) {
    components.enemies.head = enemy.append(components.enemies.head, components.enemies);
  },
};

},{}],7:[function(require,module,exports){
const bullets = require('./bullets/index.js');
const enemies = require('./enemies/index.js');
const powerUps = require('./powerUps/index.js');

module.exports = {
  keyMap: [],
  bullets,
  player: null,
  enemies,
  powerUps,
};

},{"./bullets/index.js":3,"./enemies/index.js":6,"./powerUps/index.js":8}],8:[function(require,module,exports){
module.exports = {
  head: null,
  config: {
    spawn: {
      countdown: null,
      rate: 1000,
      randomRate() {
        return Math.floor(Math.random() * this.rate);
      },
    },
  },
  types: ['deepskyblue', 'orangered', 'mediumpurple'],
  canvasFill(gameArea) {
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      i.canvasFill(gameArea.canvasContext);
    }
  },
  update(time, components, PowerUp, gameArea) {
    this.spawnUpdate(time, components, PowerUp, gameArea);
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      i.update(time, gameArea.canvas.height, components);
    }
  },
  spawnUpdate(time, components, PowerUp, gameArea) {
    components.powerUps.config.spawn.countdown -= time;
    if (components.powerUps.config.spawn.countdown <= 0) {
      components.powerUps.config.spawn.countdown += components.powerUps.config.spawn.randomRate();
      const powerUp = this.create(PowerUp, gameArea);
      this.appendList(components, powerUp);
    }
  },
  create(PowerUp, gameArea) {
    const powerUp = new PowerUp();
    powerUp.positionX = Math.floor(Math.random() * gameArea.canvas.width);
    powerUp.color = this.types[Math.floor(Math.random() * this.types.length)];
    return powerUp;
  },
  appendList(components, powerUp) {
    components.powerUps.head = powerUp.append(components.powerUps.head);
  },
};

},{}],9:[function(require,module,exports){
module.exports = {
  listen(canvas, components, Bullet, keyMap) {
    this.mouseMove(canvas, components.player);
    this.click(canvas, Bullet, components);
    this.keyInput(canvas, keyMap);
  },
  mouseMove(canvas, player) {
    canvas.addEventListener('mousemove', (e) => {
      player.positionX = e.clientX;
      player.positionY = e.clientY;
    });
  },
  click(canvas, Bullet, components) {
    canvas.addEventListener('click', () => {
      components.bullets.create(components, Bullet, canvas);
    });
  },
  keyInput(canvas, keyMap) {
    ['keydown', 'keyup'].forEach((eventListener) => {
      canvas.addEventListener(eventListener, (e) => {
        if (e.keyCode !== 116 && e.keyCode !== 123) {
          e.preventDefault();
        }
        keyMap[e.keyCode] = e.type === 'keydown';
      });
    });
  },
};

},{}],10:[function(require,module,exports){
module.exports = {
  canvas: document.getElementById('canvas'),
  start(components, Player) {
    this.canvas.width = 1366;
    this.canvas.height = 768;
    this.canvas.tabIndex = 1000;
    this.canvas.focus();
    this.canvasContext = this.canvas.getContext('2d');
    components.player = new Player(this.canvas.width, this.canvas.height);
  },
  fill() {
    this.canvasContext.font = 'bold 48px Arial, sans-serif';
    this.canvasContext.fillStyle = 'black';
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContext.fillStyle = 'white';
  },
};

},{}],11:[function(require,module,exports){
const Default = require('./default.js');

module.exports = class extends Default {
  constructor(player, width, height) {
    super(player);
    this.width = width;
    this.height = height;
    this.positionX = player.positionX + ((player.width - this.width) / 2);
    this.positionY = player.positionY - this.height;
  }
  update(time, boundary, components) {
    super.boundaryCheck(boundary, components);
    super.movement(time);
    components.player.score += this.hitCheck(components.enemies.head);
  }
  hitCheck(enemyHead) {
    let hitCount = 0;
    const Ax1 = this.positionX;
    const Ax2 = this.positionX + this.width;
    const Ay1 = this.positionY;
    const Ay2 = this.positionY + this.height;
    for (let i = enemyHead; i != null; i = i.nextEnemy) {
      if (i.stateHit === false) {
        const Bx1 = i.positionX;
        const Bx2 = i.positionX + i.width;
        const By1 = i.positionY;
        const By2 = i.positionY + i.height;
        if (super.constructor.rectangleCollision(Ax1, Ax2, Ay1, Ay2, Bx1, Bx2, By1, By2)) {
          i.stateHit = true;
          hitCount += 1;
        }
      }
    }
    return hitCount;
  }
  canvasFill(context) {
    const gradient = context.createLinearGradient(0, 500, 0, 800);
    gradient.addColorStop(0, 'deepskyblue');
    gradient.addColorStop(1, 'dodgerblue');
    context.fillStyle = gradient;
    context.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
  }
};

},{"./default.js":12}],12:[function(require,module,exports){
module.exports = class {
  constructor(player) {
    this.width = 5;
    this.height = 10;
    this.speed = 20;
    this.positionX = player.positionX + ((player.width - this.width) / 2);
    this.positionY = player.positionY - this.height;
    this.type = player.bulletType;
    this.nextBullet = null;
  }
  movement(time) {
    this.positionY -= this.speed * (time / (1000 / 60));
  }
  boundaryCheck(boundary, components) {
    if (this.positionY + this.height <= boundary) {
      this.remove(components.bullets.head);
    }
  }
  update(time, boundary, components) {
    this.boundaryCheck(boundary, components);
    this.movement(time);
    if (this.hitCheck(components.enemies.head)) {
      components.bullets.head = this.remove(components.bullets.head);
      components.player.score += 1;
    }
  }
  canvasFill(context) {
    context.fillStyle = this.type;
    context.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
  }
  hitCheck(enemyHead) {
    const Ax1 = this.positionX;
    const Ax2 = this.positionX + this.width;
    const Ay1 = this.positionY;
    const Ay2 = this.positionY + this.height;
    for (let i = enemyHead; i != null; i = i.nextEnemy) {
      if (i.stateHit === false) {
        const Bx1 = i.positionX;
        const Bx2 = i.positionX + i.width;
        const By1 = i.positionY;
        const By2 = i.positionY + i.height;
        if (this.constructor.rectangleCollision(Ax1, Ax2, Ay1, Ay2, Bx1, Bx2, By1, By2)) {
          i.stateHit = true;
          return true;
        }
      }
    }
    return false;
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
  append(head) {
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
  remove(head) {
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

},{}],13:[function(require,module,exports){
const Default = require('./default.js');
const Red = require('./red.js');
const RedAngled = require('./redAngled.js');
const Blue = require('./blue.js');
const Purple = require('./purple.js');

module.exports = {
  Default,
  Red,
  RedAngled,
  Blue,
  Purple,
};

},{"./blue.js":11,"./default.js":12,"./purple.js":14,"./red.js":15,"./redAngled.js":16}],14:[function(require,module,exports){
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

},{"./default.js":12}],15:[function(require,module,exports){
const Default = require('./default.js');

module.exports = class extends Default {
  constructor(player, offset) {
    super(player);
    this.positionX = (player.positionX + ((player.width - this.width) / 2)) + offset;
  }
};

},{"./default.js":12}],16:[function(require,module,exports){
const Default = require('./default.js');

module.exports = class extends Default {
  constructor(player, offset, angle) {
    super(player);
    this.offset = offset;
    this.angle = angle;
    this.positionX = (player.positionX + ((player.width - this.width) / 2)) + this.offset;
  }
  movement(time) {
    this.positionX += this.angle * this.speed * (time / (1000 / 60));
    this.positionY -= this.speed * (time / (1000 / 60));
  }
};

},{"./default.js":12}],17:[function(require,module,exports){
module.exports = class {
  constructor() {
    this.width = 20;
    this.height = 10;
    this.positionX = 350;
    this.positionY = 75;
    this.speed = 10;
    this.stateHit = false;
    this.nextEnemy = null;
    this.stateTargetted = false;
  }
  canvasFill(context) {
    context.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
  }
  movement(time) {
    this.positionX += this.speed * (time / (1000 / 60));
  }
  boundaryCheck(boundaryLeft, boundaryRight) {
    if (this.positionX <= boundaryLeft && this.speed < 0) {
      this.speed = -this.speed;
    } else if ((this.positionX + this.width) >= boundaryRight && this.speed > 0) {
      this.speed = -this.speed;
    }
  }
  update(time, boundaryLeft, boundaryRight, components) {
    this.boundaryCheck(boundaryLeft, boundaryRight);
    this.movement(time);
    this.hitCheck(components);
  }
  hitCheck(components) {
    if (this.stateHit) {
      components.enemies.head = this.remove(components.enemies.head, components.enemies);
    }
  }
  append(head, enemies) {
    enemies.count += 1;
    if (head == null) {
      return this;
    }
    for (let i = head; i != null; i = i.nextEnemy) {
      if (i.nextEnemy == null) {
        i.nextEnemy = this;
        i = i.nextEnemy;
      }
    }
    return head;
  }
  remove(head, enemies) {
    if (this.stateTargetted === true) {
      enemies.targettedCount -= 1;
    }
    enemies.count -= 1;
    if (head === this) {
      return head.nextEnemy;
    }
    for (let i = head; i.nextEnemy != null; i = i.nextEnemy) {
      if (i.nextEnemy === this) {
        i.nextEnemy = i.nextEnemy.nextEnemy;
      }
      if (i.nextEnemy == null) {
        return head;
      }
    }
    return head;
  }
};

},{}],18:[function(require,module,exports){
const Bullet = require('./bullet/index.js');
const Enemy = require('./enemy/index.js');
const PowerUp = require('./powerUp/index.js');
const Player = require('./player/index.js');

module.exports = {
  Bullet,
  Enemy,
  PowerUp,
  Player,
};

},{"./bullet/index.js":13,"./enemy/index.js":17,"./player/index.js":19,"./powerUp/index.js":20}],19:[function(require,module,exports){
module.exports = class {
  constructor(canvasWidth, canvasHeight) {
    this.width = 30;
    this.height = 20;
    this.positionX = canvasWidth / 2;
    this.positionY = canvasHeight - 25;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 5;
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.acceleration = 1.2;
    this.friction = 0.3;
    this.bulletType = 'white';
    this.bulletLevel = 0;
    this.maxBulletLevel = 5;
    this.score = 0;
  }
  canvasFill(context) {
    context.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
    context.fillText(this.score, 1200, 55);
  }
  update(time, canvas, keyMap, components) {
    this.movement(keyMap, time, canvas);
    this.powerUpCollisionCheck(components.powerUps.head);
  }
  movement(keyMap, time, canvas) {
    this.positionXUpdate(time, 0, canvas.width);
    this.positionYUpdate(time, 0, canvas.height);
    this.speedXUpdate(time);
    this.speedYUpdate(time);
    this.accelerateXUpdate(keyMap);
    this.accelerateYUpdate(keyMap);
  }
  positionXUpdate(time, boundaryLeft, boundaryRight) {
    this.positionX += this.speedX * (time / (1000 / 60));
    if (this.positionX < boundaryLeft) {
      this.positionX = boundaryLeft;
    } else if (this.positionX + this.width > boundaryRight) {
      this.positionX = boundaryRight - this.width;
    }
  }
  positionYUpdate(time, boundaryUp, boundaryDown) {
    this.positionY += this.speedY * (time / (1000 / 60));
    if (this.positionY < boundaryUp) {
      this.positionY = boundaryUp;
    } else if (this.positionY + this.height > boundaryDown) {
      this.positionY = boundaryDown - this.height;
    }
  }
  speedXUpdate(time) {
    if (this.speedX > -this.maxSpeed && this.speedX < this.maxSpeed) {
      this.speedX += this.accelerationX * (time / (1000 / 60));
    }
    if (this.speedX > 0) {
      this.speedX -= this.friction * (time / (1000 / 60));
      if (this.speedX < 0) {
        this.speedX = 0;
      }
    } else if (this.speedX < 0) {
      this.speedX += this.friction * (time / (1000 / 60));
      if (this.speedX > 0) {
        this.speedX = 0;
      }
    }
    if (this.speedX < -this.maxSpeed) {
      this.speedX = -this.maxSpeed;
    } else if (this.speedX > this.maxSpeed) {
      this.speedX = this.maxSpeed;
    }
  }
  speedYUpdate(time) {
    if (this.speedY > -this.maxSpeed && this.speedY < this.maxSpeed) {
      this.speedY += this.accelerationY * (time / (1000 / 60));
    }
    if (this.speedY > 0) {
      this.speedY -= this.friction * (time / (1000 / 60));
      if (this.speedY < 0) {
        this.speedY = 0;
      }
    } else if (this.speedY < 0) {
      this.speedY += this.friction * (time / (1000 / 60));
      if (this.speedY > 0) {
        this.speedY = 0;
      }
    }
    if (this.speedY < -this.maxSpeed) {
      this.speedY = -this.maxSpeed;
    } else if (this.speedY > this.maxSpeed) {
      this.speedY = this.maxSpeed;
    }
  }
  accelerateXUpdate(keyMap) {
    if (keyMap[37] === true && keyMap[39] !== true) {
      this.accelerationX = -this.acceleration;
    } else if (keyMap[37] !== true && keyMap[39] === true) {
      this.accelerationX = this.acceleration;
    } else if (
      (keyMap[37] !== true && keyMap[39] !== true) ||
      (keyMap[37] === true && keyMap[39] === true)
    ) {
      this.accelerationX = 0;
    }
  }
  accelerateYUpdate(keyMap) {
    if (keyMap[38] === true && keyMap[40] !== true) {
      this.accelerationY = -this.acceleration;
    } else if (keyMap[38] !== true && keyMap[40] === true) {
      this.accelerationY = this.acceleration;
    } else if (
      (keyMap[38] !== true && keyMap[40] !== true) ||
      (keyMap[38] === true && keyMap[40] === true)
    ) {
      this.accelerationY = 0;
    }
  }
  powerUpCollisionCheck(powerUpHead) {
    for (let i = powerUpHead; i != null; i = i.nextPowerUp) {
      if (
        i.positionX >= this.positionX &&
        i.positionX <= this.positionX + this.width &&
        i.positionY >= this.positionY &&
        i.positionY <= this.positionY + this.height
      ) {
        if (this.bulletType === i.color) {
          if (this.bulletLevel < this.maxBulletLevel) {
            this.bulletLevel += 1;
          }
        } else {
          this.bulletType = i.color;
          this.bulletLevel = 1;
        }
        i.stateObtained = true;
      }
    }
  }
};

},{}],20:[function(require,module,exports){
module.exports = class {
  constructor() {
    this.radius = 5;
    this.speed = 2;
    this.positionX = null;
    this.positionY = null;
    this.color = null;
    this.stateObtained = false;
    this.nextPowerUp = null;
  }
  canvasFill(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
    context.fill();
  }
  movement(time) {
    this.positionY += this.speed * (time / (1000 / 60));
  }
  update(time, boundaryBottom, components) {
    this.movement(time);
    this.boundaryCheck(boundaryBottom, components);
    if (this.stateObtained) {
      components.powerUps.head = this.remove(components.powerUps.head);
    }
  }
  boundaryCheck(boundaryBottom, components) {
    if (this.positionY >= boundaryBottom) {
      this.remove(components.powerUps.head);
    }
  }
  append(head) {
    if (head == null) {
      return this;
    }
    for (let i = head; i != null; i = i.nextPowerUp) {
      if (i.nextPowerUp == null) {
        i.nextPowerUp = this;
        i = i.nextPowerUp;
      }
    }
    return head;
  }
  remove(head) {
    if (head === this) {
      return head.nextPowerUp;
    }
    for (let i = head; i.nextPowerUp != null; i = i.nextPowerUp) {
      if (i.nextPowerUp === this) {
        i.nextPowerUp = i.nextPowerUp.nextPowerUp;
      }
      if (i.nextPowerUp == null) {
        return head;
      }
    }
    return head;
  }
};

},{}],21:[function(require,module,exports){
const events = require('./events.js');
const components = require('./components/index.js');
const gameArea = require('./gameArea.js');
const Objects = require('./objects/index.js');

function canvasFill() {
  gameArea.fill();
  components.player.canvasFill(gameArea.canvasContext);
  components.enemies.canvasFill(gameArea);
  components.bullets.canvasFill(gameArea);
  components.powerUps.canvasFill(gameArea);
}

function update() {
  let timeCurrent;
  let timePrevious = 0;
  let timeElapsed;

  function requestAnimationFrameLoop(timeStamp) {
    timeCurrent = timeStamp || 20; // timeStamp is undefined until requestAnimationFrame runs
    timeElapsed = timeCurrent - timePrevious;
    timePrevious = timeCurrent;

    components.player.update(timeElapsed, gameArea.canvas, components.keyMap, components);
    components.enemies.update(timeElapsed, 0, 1366, components, Objects.Enemy);
    components.bullets.update(timeElapsed, 0, components, Objects.Bullet, gameArea.canvas);
    components.powerUps.update(timeElapsed, components, Objects.PowerUp, gameArea);
    canvasFill();
    window.requestAnimationFrame(requestAnimationFrameLoop);
  }
  requestAnimationFrameLoop(timeElapsed, timePrevious);
}

window.onload = () => {
  gameArea.start(components, Objects.Player);
  update();
  events.listen(gameArea.canvas, components, Objects.Bullet, components.keyMap);
};

},{"./components/index.js":7,"./events.js":9,"./gameArea.js":10,"./objects/index.js":18}]},{},[21]);
