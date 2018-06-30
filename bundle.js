(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
};

},{}],2:[function(require,module,exports){
const config = require('./config.js');

module.exports = function createBlue(player, Bullet) {
  let bullet = {};
  switch (player.level) {
    case 1:
      bullet = new Bullet.Blue(
        player,
        config.blue.level1.width,
        config.blue.level1.height,
      );
      break;
    case 2:
      bullet = new Bullet.Blue(
        player,
        config.blue.level2.width,
        config.blue.level2.height,
      );
      break;
    case 3:
      bullet = new Bullet.Blue(
        player,
        config.blue.level3.width,
        config.blue.level3.height,
      );
      break;
    case 4:
      bullet = new Bullet.Blue(
        player,
        config.blue.level4.width,
        config.blue.level4.height,
      );
      break;
    case 5:
      bullet = new Bullet.Blue(
        player,
        config.blue.level5.width,
        config.blue.level5.height,
      );
      break;
    default:
      break;
  }
  return bullet;
};

},{"./config.js":1}],3:[function(require,module,exports){
const config = require('./config.js');

module.exports = function createPurple(components, Bullet) {
  let enemyTarget = Math.floor(Math.random() * components.enemies.count);
  let enemyHead = components.enemies.head;
  for (let i = 0; i < enemyTarget; i += 1) {
    enemyHead = enemyHead.nextEnemy;
  }
  console.log(enemyHead);
  let bullet = {};
  switch (components.player.level) {
    case 1:
      if (enemyHead == null) {
        return null;
      }
      bullet = new Bullet.Purple(components.player, enemyHead);
      components.enemies.head = enemyHead.remove(components.enemies.head, components.enemies);
      break;
  }
  return bullet;
};

},{"./config.js":1}],4:[function(require,module,exports){
const config = require('./config.js');

module.exports = function createRed(player, Bullet, bulletArray) {
  switch (player.level) {
    case 1:
      bulletArray[0] = new Bullet.Red(player, -config.red.level1.offset);
      bulletArray[1] = new Bullet.Red(player, config.red.level1.offset);
      break;
    case 2:
      bulletArray[0] = new Bullet.Red(player, -config.red.level2.offset);
      bulletArray[1] = new Bullet.Red(player, 0);
      bulletArray[2] = new Bullet.Red(player, config.red.level2.offset);
      break;
    case 3:
      bulletArray[0] = new Bullet.RedAngled(
        player,
        -config.red.level3.offset,
        -config.red.level3.angle,
      );
      bulletArray[1] = new Bullet.Red(player, -config.red.level3.offset);
      bulletArray[2] = new Bullet.Red(player, 0);
      bulletArray[3] = new Bullet.Red(player, config.red.level3.offset);
      bulletArray[4] = new Bullet.RedAngled(
        player,
        config.red.level3.offset,
        config.red.level3.angle,
      );
      break;
    case 4:
      bulletArray[0] = new Bullet.RedAngled(
        player,
        -config.red.level4.offset,
        -config.red.level4.angleOuter,
      );
      bulletArray[1] = new Bullet.RedAngled(
        player,
        -config.red.level4.offset,
        -config.red.level4.angleInner,
      );
      bulletArray[2] = new Bullet.Red(player, -config.red.level4.offset);
      bulletArray[3] = new Bullet.Red(player, 0);
      bulletArray[4] = new Bullet.Red(player, config.red.level4.offset);
      bulletArray[5] = new Bullet.RedAngled(
        player,
        config.red.level4.offset,
        config.red.level4.angleInner,
      );
      bulletArray[6] = new Bullet.RedAngled(
        player,
        config.red.level4.offset,
        config.red.level4.angleOuter,
      );
      break;
    case 5:
      bulletArray[0] = new Bullet.RedAngled(
        player,
        -config.red.level5.offset,
        -config.red.level5.angleOuter,
      );
      bulletArray[1] = new Bullet.RedAngled(
        player,
        -config.red.level5.offset,
        -config.red.level5.angleMiddle,
      );
      bulletArray[2] = new Bullet.RedAngled(
        player,
        -config.red.level5.offset,
        -config.red.level5.angleInner,
      );
      bulletArray[3] = new Bullet.Red(player, -config.red.level5.offset);
      bulletArray[4] = new Bullet.Red(player, 0);
      bulletArray[5] = new Bullet.Red(player, config.red.level5.offset);
      bulletArray[6] = new Bullet.RedAngled(
        player,
        config.red.level5.offset,
        config.red.level5.angleInner,
      );
      bulletArray[7] = new Bullet.RedAngled(
        player,
        config.red.level5.offset,
        config.red.level5.angleMiddle,
      );
      bulletArray[8] = new Bullet.RedAngled(
        player,
        config.red.level5.offset,
        config.red.level5.angleOuter,
      );
      break;
    default:
      break;
  }
  return bulletArray;
};

},{"./config.js":1}],5:[function(require,module,exports){
const config = require('./config.js');
const createBlue = require('./createBlue.js');
const createRed = require('./createRed.js');
const createPurple = require('./createPurple.js');

module.exports = {
  config,
  bulletCount: 0,
  head: null,
  canvasFill(gameArea) {
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.canvasFill(gameArea.canvasElementDrawingContext);
    }
  },
  update(timeElapsed, boundary, components, Bullet, keyMap) {
    if (keyMap[13] === true) {
      this.createNewBullet(components, Bullet);
    }
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.update(timeElapsed, boundary, components, Bullet);
    }
  },
  createNewBullet(components, Bullet) {
    let bullet = {};
    switch (components.player.bulletType) {
      case 'white':
        bullet = new Bullet.Default(components.player);
        this.appendNewBullet(bullet, components);
        break;
      case 'orangered': {
        const emptyArray = [];
        const bulletArray = createRed(components.player, Bullet, emptyArray);
        for (let i = 0; bulletArray[i] != null; i += 1) {
          this.appendNewBullet(bulletArray[i], components);
        }
        break;
      }
      case 'deepskyblue':
        bullet = createBlue(components.player, Bullet);
        this.appendNewBullet(bullet, components);
        break;
      case 'mediumpurple':
        bullet = createPurple(components, Bullet);
        if (bullet != null) {
          this.appendNewBullet(bullet, components);
        }
        break;
      default:
        bullet = new Bullet.Default(components.player);
        this.appendNewBullet(bullet, components);
    }
  },
  appendNewBullet(bullet, components) {
    components.bullets.head = bullet.append(components.bullets.head);
  },
};

},{"./config.js":1,"./createBlue.js":2,"./createPurple.js":3,"./createRed.js":4}],6:[function(require,module,exports){
module.exports = {
  head: null,
  count: 0,
  spawn: {
    countdown: 1000,
    rate: 1000,
  },
  canvasFill(gameArea) {
    for (let i = this.head; i != null; i = i.nextEnemy) {
      i.canvasFill(gameArea.canvasElementDrawingContext);
    }
    gameArea.canvasElementDrawingContext.fillText(this.count, 100, 55);
  },
  update(timeElapsed, boundaryLeft, boundaryRight, components, Enemy) {
    this.spawnUpdate(timeElapsed, components, Enemy);
    for (let i = this.head; i != null; i = i.nextEnemy) {
      i.update(timeElapsed, boundaryLeft, boundaryRight, components);
    }
  },
  spawnUpdate(timeElapsed, components, Enemy) {
    components.enemies.spawn.countdown -= timeElapsed;
    if (components.enemies.spawn.countdown <= 0) {
      components.enemies.spawn.countdown += components.enemies.spawn.rate;
      const enemy = this.createNew(Enemy);
      this.appendNewEnemy(components, enemy);
    }
  },
  createNew(Enemy) {
    const enemy = new Enemy(Enemy.getDefaultSpec());
    return enemy;
  },
  appendNewEnemy(components, enemy) {
    components.enemies.head = enemy.append(components.enemies.head, components.enemies);
  },
};

},{}],7:[function(require,module,exports){
const bullets = require('./bullets/index.js');
const enemies = require('./enemies/index.js');
const powerUps = require('./powerUps/index.js');

module.exports = {
  bullets,
  player: null,
  enemies,
  powerUps,
};

},{"./bullets/index.js":5,"./enemies/index.js":6,"./powerUps/index.js":8}],8:[function(require,module,exports){
module.exports = {
  head: null,
  config: {
    spawn: {
      countdown: null,
      rate() {
        return Math.floor(Math.random() * 1000);
      },
    },
  },
  types: ['deepskyblue', 'orangered', 'mediumpurple'],
  canvasFill(gameArea) {
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      i.canvasFill(gameArea.canvasElementDrawingContext);
    }
  },
  update(timeElapsed, components, PowerUp, gameArea) {
    this.spawnUpdate(timeElapsed, components, PowerUp, gameArea);
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      i.update(timeElapsed, gameArea.canvasElement.height, components);
    }
  },
  spawnUpdate(timeElapsed, components, PowerUp, gameArea) {
    components.powerUps.config.spawn.countdown -= timeElapsed;
    if (components.powerUps.config.spawn.countdown <= 0) {
      components.powerUps.config.spawn.countdown += components.powerUps.config.spawn.rate();
      const powerUp = this.createNew(PowerUp, gameArea);
      this.appendNewPowerUp(components, powerUp);
    }
  },
  createNew(PowerUp, gameArea) {
    const powerUp = new PowerUp(PowerUp.getDefaultSpec());
    powerUp.positionHorizontal = Math.floor(Math.random() * gameArea.canvasElement.width);
    powerUp.color = this.types[Math.floor(Math.random() * this.types.length)];
    return powerUp;
  },
  appendNewPowerUp(components, powerUp) {
    components.powerUps.head = powerUp.append(components.powerUps.head);
  },
};

},{}],9:[function(require,module,exports){
module.exports = class {
  static mouseMove(canvasElement, player) {
    canvasElement.addEventListener('mousemove', (e) => {
      player.positionHorizontal = e.clientX;
    });
  }

  static click(canvasElement, Bullet, components) {
    canvasElement.addEventListener('click', () => {
      const bullet = components.bullets.createNew(components, Bullet);
      components.bullets.appendNewBullet(bullet, components);
    });
  }
  static keyInput(canvasElement, keyMap) {
    ['keydown', 'keyup'].forEach((eventListener) => {
      canvasElement.addEventListener(eventListener, (e) => {
        keyMap[e.keyCode] = e.type === 'keydown';
      });
    });
  }
};

},{}],10:[function(require,module,exports){
const Player = require('./objects/player/index.js');
const Enemy = require('./objects/enemy/index.js');

module.exports = {
  canvasElement: document.getElementById('canvas'),
  start(components) {
    this.canvasElement.width = 1366;
    this.canvasElement.height = 768;
    this.canvasElement.tabIndex = 1000;
    this.canvasElementDrawingContext = this.canvasElement.getContext('2d');
    components.player = new Player(this.canvasElement.width, this.canvasElement.height);
    const enemy = new Enemy(Enemy.getDefaultSpec());
    components.enemies.head = enemy.append(components.enemies.head, components.enemies);
  },
  fill() {
    this.canvasElementDrawingContext.font = 'bold 48px Arial, sans-serif';
    this.canvasElementDrawingContext.fillStyle = 'black';
    this.canvasElementDrawingContext.fillRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height,
    );
    this.canvasElementDrawingContext.fillStyle = 'white';
  },
  enemySpawnCountdown: 1000,
  powerUpSpawnCountdown: 1000,
};

},{"./objects/enemy/index.js":17,"./objects/player/index.js":19}],11:[function(require,module,exports){
const Default = require('./default.js');

module.exports = class extends Default {
  constructor(player, width, height) {
    super(player);
    this.width = width;
    this.height = height;
    this.positionHorizontal = player.positionHorizontal + ((player.width - this.width) / 2);
    this.positionVertical = player.positionVertical - this.height;
  }
  update(timeElapsed, boundary, components) {
    super.boundaryCheck(boundary, components);
    super.movement(timeElapsed);
    components.player.score += this.hitCheck(components.enemies.head);
  }
  hitCheck(enemyHead) {
    let hitCount = 0;
    const Ax1 = this.positionHorizontal;
    const Ax2 = this.positionHorizontal + this.width;
    const Ay1 = this.positionVertical;
    const Ay2 = this.positionVertical + this.height;
    for (let i = enemyHead; i != null; i = i.nextEnemy) {
      if (i.hitState === false) {
        const Bx1 = i.positionHorizontal;
        const Bx2 = i.positionHorizontal + i.width;
        const By1 = i.positionVertical;
        const By2 = i.positionVertical + i.height;
        if (super.constructor.rectangleCollision(Ax1, Ax2, Ay1, Ay2, Bx1, Bx2, By1, By2)) {
          i.hitState = true;
          hitCount += 1;
        }
      }
    }
    return hitCount;
  }
  canvasFill(drawingContext) {
    let gradient = drawingContext.createLinearGradient(0, 500, 0, 800);
    gradient.addColorStop(0, 'deepskyblue');
    gradient.addColorStop(1, "dodgerblue");
    drawingContext.fillStyle = gradient;
    drawingContext.fillRect(
      this.positionHorizontal,
      this.positionVertical,
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
    this.positionHorizontal = player.positionHorizontal + ((player.width - this.width) / 2);
    this.positionVertical = player.positionVertical - this.height;
    this.type = player.bulletType;
    this.nextBullet = null;
  }
  movement(time) {
    this.positionVertical -= this.speed * (time / (1000 / 60));
  }

  boundaryCheck(boundary, components) {
    if (this.positionVertical + this.height <= boundary) {
      this.remove(components.bullets.head);
    }
  }

  update(timeElapsed, boundary, components) {
    this.boundaryCheck(boundary, components);
    this.movement(timeElapsed);
    if (this.hitCheck(components.enemies.head)) {
      components.bullets.head = this.remove(components.bullets.head);
      components.player.score += 1;
    }
  }

  canvasFill(drawingContext) {
    drawingContext.fillStyle = this.type;
    drawingContext.fillRect(
      this.positionHorizontal,
      this.positionVertical,
      this.width,
      this.height,
    );
  }
  hitCheck(enemyHead) {
    const Ax1 = this.positionHorizontal;
    const Ax2 = this.positionHorizontal + this.width;
    const Ay1 = this.positionVertical;
    const Ay2 = this.positionVertical + this.height;
    for (let i = enemyHead; i != null; i = i.nextEnemy) {
      if (i.hitState === false) {
        const Bx1 = i.positionHorizontal;
        const Bx2 = i.positionHorizontal + i.width;
        const By1 = i.positionVertical;
        const By2 = i.positionVertical + i.height;
        if (this.constructor.rectangleCollision(Ax1, Ax2, Ay1, Ay2, Bx1, Bx2, By1, By2)) {
          i.hitState = true;
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
  constructor(player, enemy) {
    super(player);
    this.positionHorizontal = player.positionHorizontal + (player.width / 2);
    this.positionVertical = player.positionVertical;
    this.displayTime = 200;
    this.enemyPositionHorizontal = enemy.positionHorizontal + (enemy.width / 2);
    this.enemyPositionVertical = enemy.positionVertical + (enemy.height / 2);
  }
  update(timeElapsed, boundary, components) {
    this.displayTime -= timeElapsed;
    if (this.displayTime <= 0) {
      components.bullets.head = super.remove(components.bullets.head);
      components.player.score += 1;
    }
  }
  canvasFill(drawingContext) {
    drawingContext.strokeStyle = 'mediumpurple';
    drawingContext.lineWidth = 10;
    drawingContext.lineCap = 'round';
    drawingContext.beginPath();
    drawingContext.moveTo(this.positionHorizontal, this.positionVertical);
    console.log(this.enemyPositionVertical);
    drawingContext.lineTo(this.enemyPositionHorizontal, this.enemyPositionVertical);
    drawingContext.stroke();
  }
};

},{"./default.js":12}],15:[function(require,module,exports){
const Default = require('./default.js');

module.exports = class extends Default {
  constructor(player, offset) {
    super(player);
    this.positionHorizontal =
      (player.positionHorizontal + ((player.width - this.width) / 2)) +
      offset;
  }
};

},{"./default.js":12}],16:[function(require,module,exports){
const Default = require('./default.js');

module.exports = class extends Default {
  constructor(player, offset, angle) {
    super(player);
    this.offset = offset;
    this.angle = angle;
    this.positionHorizontal =
      (player.positionHorizontal + ((player.width - this.width) / 2)) +
      this.offset;
  }
  movement(time) {
    this.positionVertical -= this.speed * (time / (1000 / 60));
    this.positionHorizontal += this.angle * this.speed * (time / (1000 / 60));
  }
};

},{"./default.js":12}],17:[function(require,module,exports){
module.exports = class {
  constructor(obj) {
    this.width = obj.width;
    this.height = obj.height;
    this.positionHorizontal = obj.positionHorizontal;
    this.positionVertical = obj.positionVertical;
    this.speed = obj.speed;
    this.hitState = obj.hitState;
    this.nextEnemy = obj.nextEnemy;
  }
  static getDefaultSpec() {
    return {
      width: 20,
      height: 10,
      positionHorizontal: 350,
      positionVertical: 75, // canvas height - height
      speed: 10,
      hitState: false,
      nextEnemy: null,
    };
  }
  canvasFill(drawingContext) {
    drawingContext.fillRect(
      this.positionHorizontal,
      this.positionVertical,
      this.width,
      this.height,
    );
  }
  movement(timeElapsed) {
    this.positionHorizontal += this.speed * (timeElapsed / (1000 / 60));
  }
  boundaryCheck(boundaryLeft, boundaryRight) {
    if (this.positionHorizontal <= boundaryLeft && this.speed < 0) {
      this.speed = -this.speed;
    } else if ((this.positionHorizontal + this.width) >= boundaryRight && this.speed > 0) {
      this.speed = -this.speed;
    }
  }
  update(timeElapsed, boundaryLeft, boundaryRight, components) {
    this.boundaryCheck(boundaryLeft, boundaryRight);
    this.movement(timeElapsed);
    this.hitCheck(components);
  }
  hitCheck(components) {
    if (this.hitState) {
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
    this.positionHorizontal = canvasWidth / 2;
    this.positionVertical = canvasHeight - 25;
    this.score = 0;
    this.speed = 5;
    this.bulletType = 'white';
    this.level = 0;
  }
  canvasFill(drawingContext) {
    drawingContext.fillRect(
      this.positionHorizontal,
      this.positionVertical,
      this.width,
      this.height,
    );
    drawingContext.fillText(this.score, 1200, 55);
  }
  update(timeElapsed, canvasElement, keyMap, components) {
    this.movementLeft(keyMap, timeElapsed, 0);
    this.movementRight(keyMap, timeElapsed, canvasElement.width);
    this.movementUp(keyMap, timeElapsed, 0);
    this.movementDown(keyMap, timeElapsed, canvasElement.height);
    this.collisionCheckPowerUp(components.powerUps.head);
  }
  movementLeft(keyMap, time, boundaryLeft) {
    if (keyMap[37] === true && this.positionHorizontal >= boundaryLeft) {
      this.positionHorizontal -= this.speed * (time / (1000 / 60));
    }
    if (this.positionHorizontal < boundaryLeft) {
      this.positionHorizontal = boundaryLeft;
    }
  }
  movementRight(keyMap, time, boundaryRight) {
    if (keyMap[39] === true && this.positionHorizontal + this.width <= boundaryRight) {
      this.positionHorizontal += this.speed * (time / (1000 / 60));
    }
    if (this.positionHorizontal + this.width > boundaryRight) {
      this.positionHorizontal = boundaryRight - this.width;
    }
  }
  movementUp(keyMap, time, boundaryUp) {
    if (keyMap[38] === true && this.positionVertical >= boundaryUp) {
      this.positionVertical -= this.speed * (time / (1000 / 60));
    }
    if (this.positionVertical < boundaryUp) {
      this.positionVertical = boundaryUp;
    }
  }
  movementDown(keyMap, time, boundaryDown) {
    if (keyMap[40] === true && this.positionVertical + this.height <= boundaryDown) {
      this.positionVertical += this.speed * (time / (1000 / 60));
    }
    if (this.positionVertical + this.height > boundaryDown) {
      this.positionVertical = boundaryDown - this.height;
    }
  }
  collisionCheckPowerUp(powerUpHead) {
    for (let i = powerUpHead; i != null; i = i.nextPowerUp) {
      if (
        i.positionHorizontal >= this.positionHorizontal &&
        i.positionHorizontal <= this.positionHorizontal + this.width &&
        i.positionVertical >= this.positionVertical &&
        i.positionVertical <= this.positionVertical + this.height
      ) {
        if (this.bulletType === i.color) {
          if (this.level < 5) {
            this.level += 1;
          }
        } else {
          this.bulletType = i.color;
          this.level = 1;
        }
        i.stateObtained = true;
      }
    }
  }
};

},{}],20:[function(require,module,exports){
module.exports = class {
  constructor(obj) {
    this.radius = obj.radius;
    this.speed = obj.speed;
    this.positionHorizontal = obj.positionHorizontal;
    this.positionVertical = obj.positionVertical;
    this.color = obj.color;
    this.stateObtained = obj.stateObtained;
  }
  static getDefaultSpec() {
    return {
      radius: 5,
      speed: 2,
      positionHorizontal: null,
      positionVertical: null,
      color: null,
      stateObtained: false,
    };
  }
  canvasFill(drawingContext) {
    drawingContext.fillStyle = this.color;
    drawingContext.beginPath();
    drawingContext.arc(this.positionHorizontal, this.positionVertical, this.radius, 0, 2 * Math.PI);
    drawingContext.fill();
  }
  movement(timeElapsed) {
    this.positionVertical += this.speed * (timeElapsed / (1000 / 60));
  }
  update(timeElapsed, boundaryBottom, components) {
    this.movement(timeElapsed);
    this.boundaryCheck(boundaryBottom, components);
    if (this.stateObtained) {
      components.powerUps.head = this.remove(components.powerUps.head);
    }
  }
  boundaryCheck(boundaryBottom, components) {
    if (this.positionVertical >= boundaryBottom) {
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
const Event = require('./event.js');
const components = require('./components/index.js');
const gameArea = require('./gameArea.js');
const Objects = require('./objects/index.js');

const keyMap = [];

function canvasFill(components, gameArea) {
  gameArea.fill();
  components.player.canvasFill(gameArea.canvasElementDrawingContext);
  components.enemies.canvasFill(gameArea);
  components.bullets.canvasFill(gameArea);
  components.powerUps.canvasFill(gameArea);
}

function update(components, gameArea) {
  let timeElapsed;
  let timePrevious = 0;

  function requestAnimationFrameLoop(timeStamp) {
    timeStamp = timeStamp || 20; // timeStamp is undefined until window.requestAnimationFrame runs
    timeElapsed = timeStamp - timePrevious;
    timePrevious = timeStamp;

    components.player.update(timeElapsed, gameArea.canvasElement, keyMap, components);
    components.bullets.update(timeElapsed, 0, components, Objects.Bullet, keyMap);
    components.enemies.update(timeElapsed, 0, 1366, components, Objects.Enemy);
    components.powerUps.update(timeElapsed, components, Objects.PowerUp, gameArea);
    canvasFill(components, gameArea);
    window.requestAnimationFrame(requestAnimationFrameLoop);
  }
  requestAnimationFrameLoop(timeElapsed, timePrevious);
}

window.onload = () => {
  gameArea.start(components);
  update(components, gameArea);
  Event.mouseMove(gameArea.canvasElement, components.player);
  Event.click(gameArea.canvasElement, Objects.Bullet, components);
  Event.keyInput(gameArea.canvasElement, keyMap);
};

},{"./components/index.js":7,"./event.js":9,"./gameArea.js":10,"./objects/index.js":18}]},{},[21]);
