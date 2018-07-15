(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Bullet = require('../objects/bullet/index.js');
const { blue } = require('./config.js');

module.exports = {
  config: blue,
  createBlue(game) {
    let bullet = {};
    switch (game.player.bulletLevel) {
      case 1:
        bullet = new Bullet.Blue(
          game,
          this.config.level1.width,
          this.config.level1.height,
        );
        break;
      case 2:
        bullet = new Bullet.Blue(
          game,
          this.config.level2.width,
          this.config.level2.height,
        );
        break;
      case 3:
        bullet = new Bullet.Blue(
          game,
          this.config.level3.width,
          this.config.level3.height,
        );
        break;
      case 4:
        bullet = new Bullet.Blue(
          game,
          this.config.level4.width,
          this.config.level4.height,
        );
        break;
      case 5:
        bullet = new Bullet.Blue(
          game,
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

},{"../objects/bullet/index.js":11,"./config.js":2}],2:[function(require,module,exports){
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
const blue = require('./blue.js');
const red = require('./red.js');
const purple = require('./purple.js');
const Bullet = require('../objects/bullet/index.js');

module.exports = {
  bulletCount: 0,
  bulletCountPurple: 0,
  head: null,
  draw(game) {
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.draw();
    }
    game.canvasContext.fillText(this.bulletCountPurple, 400, 55);
  },
  update(game) {
    if (game.keyMap[13] === true) {
      this.create(game);
    }
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.update();
    }
  },
  create(game) {
    let bullet = {};
    switch (game.player.bulletType) {
      case 'white':
        this.head = new Bullet.Default(game).append();
        break;
      case 'orangered': {
        const bulletArray = red.createRed(game);
        for (let i = 0; bulletArray[i] != null; i += 1) {
          this.head = bulletArray[i].append();
        }
        break;
      }
      case 'deepskyblue':
        this.head = blue.createBlue(game).append();
        break;
      case 'mediumpurple':
        bullet = purple.createPurple(game);
        if (bullet != null) {
          this.head = bullet.append();
        }
        break;
      default:
        this.head = new Bullet.Default(game).append();
    }
  },
};

},{"../objects/bullet/index.js":11,"./blue.js":1,"./purple.js":4,"./red.js":5}],4:[function(require,module,exports){
const Bullet = require('../objects/bullet/index.js');
const { purple } = require('./config.js');

module.exports = {
  config: purple,
  createPurple(game) {
    const findRandomUntargettedEnemy = () => {
      let enemy = game.enemies.head;
      const untargettedEnemiesCount = game.enemies.count - game.enemies.targettedCount;
      const randomUntargettedEnemy = Math.floor(Math.random() * untargettedEnemiesCount);
      while (enemy != null && enemy.stateTargetted === true) {
        enemy = enemy.nextEnemy;
      }
      if (enemy == null) { // no untargetted Enemy
        return null;
      } else if (randomUntargettedEnemy === 0) { // 1 untargetted Enemy
        return enemy;
      }
      for (let i = 0; i < randomUntargettedEnemy; i += 1) { // > 1 untargettedEnemy
        enemy = enemy.nextEnemy;
        while (enemy.stateTargetted !== false) {
          enemy = enemy.nextEnemy;
        }
      }
      return enemy;
    };
    const enemy = findRandomUntargettedEnemy();
    if (enemy == null) {
      return null;
    }
    switch (game.player.bulletLevel) {
      case 1:
        if (game.bullets.bulletCountPurple >= this.config.level1.maxBullets) {
          return null;
        }
        break;
      case 2:
        if (game.bullets.bulletCountPurple >= this.config.level2.maxBullets) {
          return null;
        }
        break;
      case 3:
        if (game.bullets.bulletCountPurple >= this.config.level3.maxBullets) {
          return null;
        }
        break;
      case 4:
        if (game.bullets.bulletCountPurple >= this.config.level4.maxBullets) {
          return null;
        }
        break;
      case 5:
        if (game.bullets.bulletCountPurple >= this.config.level5.maxBullets) {
          return null;
        }
        break;
      default:
        break;
    }
    return new Bullet.Purple(game, enemy);
  },
};

},{"../objects/bullet/index.js":11,"./config.js":2}],5:[function(require,module,exports){
const Bullet = require('../objects/bullet/index.js');
const { red } = require('./config.js');

module.exports = {
  config: red,
  createRed(game) {
    const bulletArray = [];
    switch (game.player.bulletLevel) {
      case 1:
        bulletArray[0] = new Bullet.Red(game, -this.config.level1.offset);
        bulletArray[1] = new Bullet.Red(game, this.config.level1.offset);
        break;
      case 2:
        bulletArray[0] = new Bullet.Red(game, -this.config.level2.offset);
        bulletArray[1] = new Bullet.Red(game, 0);
        bulletArray[2] = new Bullet.Red(game, this.config.level2.offset);
        break;
      case 3:
        bulletArray[0] = new Bullet.RedAngled(
          game,
          -this.config.level3.offset,
          -this.config.level3.angle,
        );
        bulletArray[1] = new Bullet.Red(game, -this.config.level3.offset);
        bulletArray[2] = new Bullet.Red(game, 0);
        bulletArray[3] = new Bullet.Red(game, this.config.level3.offset);
        bulletArray[4] = new Bullet.RedAngled(
          game,
          this.config.level3.offset,
          this.config.level3.angle,
        );
        break;
      case 4:
        bulletArray[0] = new Bullet.RedAngled(
          game,
          -this.config.level4.offset,
          -this.config.level4.angleOuter,
        );
        bulletArray[1] = new Bullet.RedAngled(
          game,
          -this.config.level4.offset,
          -this.config.level4.angleInner,
        );
        bulletArray[2] = new Bullet.Red(game, -this.config.level4.offset);
        bulletArray[3] = new Bullet.Red(game, 0);
        bulletArray[4] = new Bullet.Red(game, this.config.level4.offset);
        bulletArray[5] = new Bullet.RedAngled(
          game,
          this.config.level4.offset,
          this.config.level4.angleInner,
        );
        bulletArray[6] = new Bullet.RedAngled(
          game,
          this.config.level4.offset,
          this.config.level4.angleOuter,
        );
        break;
      case 5:
        bulletArray[0] = new Bullet.RedAngled(
          game,
          -this.config.level5.offset,
          -this.config.level5.angleOuter,
        );
        bulletArray[1] = new Bullet.RedAngled(
          game,
          -this.config.level5.offset,
          -this.config.level5.angleMiddle,
        );
        bulletArray[2] = new Bullet.RedAngled(
          game,
          -this.config.level5.offset,
          -this.config.level5.angleInner,
        );
        bulletArray[3] = new Bullet.Red(game, -this.config.level5.offset);
        bulletArray[4] = new Bullet.Red(game, 0);
        bulletArray[5] = new Bullet.Red(game, this.config.level5.offset);
        bulletArray[6] = new Bullet.RedAngled(
          game,
          this.config.level5.offset,
          this.config.level5.angleInner,
        );
        bulletArray[7] = new Bullet.RedAngled(
          game,
          this.config.level5.offset,
          this.config.level5.angleMiddle,
        );
        bulletArray[8] = new Bullet.RedAngled(
          game,
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

},{"../objects/bullet/index.js":11,"./config.js":2}],6:[function(require,module,exports){
const Enemy = require('../objects/enemy/index.js');

module.exports = {
  head: null,
  count: 0,
  targettedCount: 0,
  totalTime: 0,
  config: {
    spawn: {
      countdown: 1000,
      rate: 1000,
    },
  },
  draw(game) {
    for (let i = this.head; i != null; i = i.nextEnemy) {
      i.draw();
    }
    game.canvasContext.fillText(this.count, 100, 55);
  },
  update() {
    for (let i = this.head; i != null; i = i.nextEnemy) {
      i.update();
    }
  },
  spawn(game) {
    game.enemies.config.spawn.countdown -= game.timer.deltaTime;
    if (game.enemies.config.spawn.countdown <= 0) {
      game.enemies.config.spawn.countdown += game.enemies.config.spawn.rate;
      game.enemies.head = new Enemy(game).append();
    }
  },
};

},{"../objects/enemy/index.js":15}],7:[function(require,module,exports){
const Bullet = require('./objects/bullet/index.js');

module.exports = {
  listen(game) {
    this.mouseMove(game);
    this.click(game);
    this.keyInput(game);
  },
  mouseMove(game) {
    game.canvas.addEventListener('mousemove', (e) => {
      game.player.positionX = e.clientX;
      game.player.positionY = e.clientY;
    });
  },
  click(game) {
    game.canvas.addEventListener('click', () => {
      game.bullets.create(game, Bullet);
    });
  },
  keyInput(game) {
    ['keydown', 'keyup'].forEach((eventListener) => {
      game.canvas.addEventListener(eventListener, (e) => {
        if (e.keyCode !== 116 && e.keyCode !== 123) {
          e.preventDefault();
        }
        game.keyMap[e.keyCode] = e.type === 'keydown';
      });
    });
  },
};

},{"./objects/bullet/index.js":11}],8:[function(require,module,exports){
const Timer = require('./timer.js');
const bullets = require('./bullets/index.js');
const enemies = require('./enemies/index.js');
const powerUps = require('./powerUps/index.js');
const Player = require('./objects/player/index.js');

module.exports = {
  keyMap: [],
  bullets,
  enemies,
  powerUps,
  player: null,
  canvas: document.getElementById('canvas'),
  init() {
    this.timer = new Timer();
    this.canvas.width = 1366;
    this.canvas.height = 768;
    this.canvas.tabIndex = 1000;
    this.canvas.focus();
    this.canvasContext = this.canvas.getContext('2d');
    this.player = new Player(this);
  },
  start() {
    const gameLoop = () => {
      this.timer.tick();
      this.update();
      this.draw();
      this.spawn();
      window.requestAnimationFrame(gameLoop);
    };
    gameLoop();
  },
  drawBackground() {
    this.canvasContext.font = 'bold 48px Arial, sans-serif';
    this.canvasContext.fillStyle = 'black';
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContext.fillStyle = 'white';
  },
  update() {
    this.player.update();
    this.enemies.update();
    this.bullets.update(this);
    this.powerUps.update();
  },
  draw() {
    this.drawBackground();
    this.player.draw();
    this.enemies.draw(this);
    this.bullets.draw(this);
    this.powerUps.draw();
  },
  spawn() {
    this.enemies.spawn(this);
    this.powerUps.spawn(this);
  },
};

},{"./bullets/index.js":3,"./enemies/index.js":6,"./objects/player/index.js":16,"./powerUps/index.js":18,"./timer.js":20}],9:[function(require,module,exports){
const Default = require('./default.js');

module.exports = class extends Default {
  constructor(game, width, height) {
    super(game);
    this.width = width;
    this.height = height;
    this.positionX = game.player.positionX + ((game.player.width - this.width) / 2);
    this.positionY = game.player.positionY;
  }
  update() {
    super.boundaryCheck();
    super.movement();
    this.hitCheck();
  }
  hitCheck() {
    const Ax1 = this.positionX;
    const Ax2 = this.positionX + this.width;
    const Ay1 = this.positionY;
    const Ay2 = this.positionY + this.height;
    for (let i = this.game.enemies.head; i != null; i = i.nextEnemy) {
      if (i.removeFromGame === false) {
        const Bx1 = i.positionX;
        const Bx2 = i.positionX + i.width;
        const By1 = i.positionY;
        const By2 = i.positionY + i.height;
        if (super.constructor.rectangleCollision(Ax1, Ax2, Ay1, Ay2, Bx1, Bx2, By1, By2)) {
          i.removeFromGame = true;
          this.game.player.score += 1;
        }
      }
    }
  }
  draw() {
    const gradient = this.game.canvasContext.createLinearGradient(0, 500, 0, 800);
    gradient.addColorStop(0, 'deepskyblue');
    gradient.addColorStop(1, 'dodgerblue');
    this.game.canvasContext.fillStyle = gradient;
    this.game.canvasContext.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
  }
};

},{"./default.js":10}],10:[function(require,module,exports){
module.exports = class {
  constructor(game) {
    this.game = game;
    this.width = 5;
    this.height = 10;
    this.speed = 20;
    this.positionX = game.player.positionX + ((game.player.width - this.width) / 2);
    this.positionY = game.player.positionY;
    this.type = game.player.bulletType;
    this.nextBullet = null;
    this.removeFromGame = false;
  }
  movement() {
    this.positionY -= this.speed * (this.game.timer.deltaTime / (1000 / 60));
  }
  boundaryCheck() {
    if (this.positionY + this.height <= 0) {
      this.removeFromGame = true;
    }
  }
  update() {
    this.boundaryCheck();
    this.movement();
    this.hitCheck();
    if (this.removeFromGame === true) {
      this.game.bullets.head = this.remove();
    }
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
    for (let i = this.game.enemies.head; i != null; i = i.nextEnemy) {
      if (i.removeFromGame === false) {
        const Bx1 = i.positionX;
        const Bx2 = i.positionX + i.width;
        const By1 = i.positionY;
        const By2 = i.positionY + i.height;
        if (this.constructor.rectangleCollision(Ax1, Ax2, Ay1, Ay2, Bx1, Bx2, By1, By2)) {
          i.removeFromGame = true;
          this.game.player.score += 1;
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
  append() {
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

},{}],11:[function(require,module,exports){
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

},{"./blue.js":9,"./default.js":10,"./purple.js":12,"./red.js":13,"./redAngled.js":14}],12:[function(require,module,exports){
const Default = require('./default.js');

module.exports = class extends Default {
  constructor(game, enemy) {
    super(game);
    this.positionX = game.player.positionX + (game.player.width / 2);
    this.positionY = game.player.positionY;
    this.enemyPositionX = enemy.positionX + (enemy.width / 2);
    this.enemyPositionY = enemy.positionY + (enemy.height / 2);
    this.controlPositionX = Math.floor(Math.random() * game.canvas.width);
    this.controlPositionY = Math.floor(Math.random() * game.canvas.height);
    this.reqKillTime = 500;
    this.targetEnemy = enemy;
    this.targetPlayer = game.player;
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

},{"./default.js":10}],13:[function(require,module,exports){
const Default = require('./default.js');

module.exports = class extends Default {
  constructor(game, offset) {
    super(game);
    this.positionX = (game.player.positionX + ((game.player.width - this.width) / 2)) + offset;
  }
};

},{"./default.js":10}],14:[function(require,module,exports){
const Default = require('./default.js');

module.exports = class extends Default {
  constructor(game, offset, angle) {
    super(game);
    this.offset = offset;
    this.angle = angle;
    this.positionX = (game.player.positionX + ((game.player.width - this.width) / 2)) + this.offset;
  }
  movement() {
    this.positionX += this.angle * this.speed * (this.game.timer.deltaTime / (1000 / 60));
    this.positionY -= this.speed * (this.game.timer.deltaTime / (1000 / 60));
  }
};

},{"./default.js":10}],15:[function(require,module,exports){
module.exports = class {
  constructor(game) {
    this.game = game;
    this.width = 20;
    this.height = 10;
    this.positionX = 350;
    this.positionY = 75;
    this.speed = 10;
    this.removeFromGame = false;
    this.nextEnemy = null;
    this.stateTargetted = false;
  }
  draw() {
    this.game.canvasContext.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
  }
  movement() {
    this.positionX += this.speed * (this.game.timer.deltaTime / (1000 / 60));
  }
  boundaryCheck() {
    if (this.positionX <= 0 && this.speed < 0) {
      this.speed = -this.speed;
    } else if ((this.positionX + this.width) >= this.game.canvas.width && this.speed > 0) {
      this.speed = -this.speed;
    }
  }
  update() {
    if (this.removeFromGame) {
      this.game.enemies.head = this.remove();
    }
    this.movement();
    this.boundaryCheck();
  }
  append() {
    this.game.enemies.count += 1;
    if (this.game.enemies.head == null) {
      return this;
    }
    for (let i = this.game.enemies.head; i != null; i = i.nextEnemy) {
      if (i.nextEnemy == null) {
        i.nextEnemy = this;
        i = i.nextEnemy;
      }
    }
    return this.game.enemies.head;
  }
  remove() {
    if (this.stateTargetted === true) {
      this.game.enemies.targettedCount -= 1;
    }
    this.game.enemies.count -= 1;
    if (this.game.enemies.head === this) {
      return this.game.enemies.head.nextEnemy;
    }
    for (let i = this.game.enemies.head; i.nextEnemy != null; i = i.nextEnemy) {
      if (i.nextEnemy === this) {
        i.nextEnemy = i.nextEnemy.nextEnemy;
      }
      if (i.nextEnemy == null) {
        return this.game.enemies.head;
      }
    }
    return this.game.enemies.head;
  }
};

},{}],16:[function(require,module,exports){
module.exports = class {
  constructor(game) {
    this.game = game;
    this.width = 30;
    this.height = 20;
    this.positionX = game.canvas.width / 2;
    this.positionY = game.canvas.height - 25;
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
  draw() {
    this.game.canvasContext.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
    this.game.canvasContext.fillText(this.score, 1200, 55);
  }
  update() {
    this.movement();
    this.powerUpCollisionCheck();
  }
  movement() {
    this.positionXUpdate();
    this.positionYUpdate();
    this.speedXUpdate();
    this.speedYUpdate();
    this.accelerateXUpdate();
    this.accelerateYUpdate();
  }
  positionXUpdate() {
    this.positionX += this.speedX * (this.game.timer.deltaTime / (1000 / 60));
    if (this.positionX < 0) {
      this.positionX = 0;
    } else if (this.positionX + this.width > this.game.canvas.width) {
      this.positionX = this.game.canvas.width - this.width;
    }
  }
  positionYUpdate() {
    this.positionY += this.speedY * (this.game.timer.deltaTime / (1000 / 60));
    if (this.positionY < 0) {
      this.positionY = 0;
    } else if (this.positionY + this.height > this.game.canvas.height) {
      this.positionY = this.game.canvas.height - this.height;
    }
  }
  speedXUpdate() {
    if (this.speedX > -this.maxSpeed && this.speedX < this.maxSpeed) {
      this.speedX += this.accelerationX * (this.game.timer.deltaTime / (1000 / 60));
    }
    if (this.speedX > 0) {
      this.speedX -= this.friction * (this.game.timer.deltaTime / (1000 / 60));
      if (this.speedX < 0) {
        this.speedX = 0;
      }
    } else if (this.speedX < 0) {
      this.speedX += this.friction * (this.game.timer.deltaTime / (1000 / 60));
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
  speedYUpdate() {
    if (this.speedY > -this.maxSpeed && this.speedY < this.maxSpeed) {
      this.speedY += this.accelerationY * (this.game.timer.deltaTime / (1000 / 60));
    }
    if (this.speedY > 0) {
      this.speedY -= this.friction * (this.game.timer.deltaTime / (1000 / 60));
      if (this.speedY < 0) {
        this.speedY = 0;
      }
    } else if (this.speedY < 0) {
      this.speedY += this.friction * (this.game.timer.deltaTime / (1000 / 60));
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
  accelerateXUpdate() {
    if (this.game.keyMap[37] === true && this.game.keyMap[39] !== true) {
      this.accelerationX = -this.acceleration;
    } else if (this.game.keyMap[37] !== true && this.game.keyMap[39] === true) {
      this.accelerationX = this.acceleration;
    } else if (
      (this.game.keyMap[37] !== true && this.game.keyMap[39] !== true) ||
      (this.game.keyMap[37] === true && this.game.keyMap[39] === true)
    ) {
      this.accelerationX = 0;
    }
  }
  accelerateYUpdate() {
    if (this.game.keyMap[38] === true && this.game.keyMap[40] !== true) {
      this.accelerationY = -this.acceleration;
    } else if (this.game.keyMap[38] !== true && this.game.keyMap[40] === true) {
      this.accelerationY = this.acceleration;
    } else if (
      (this.game.keyMap[38] !== true && this.game.keyMap[40] !== true) ||
      (this.game.keyMap[38] === true && this.game.keyMap[40] === true)
    ) {
      this.accelerationY = 0;
    }
  }
  powerUpCollisionCheck() {
    for (let i = this.game.powerUps.head; i != null; i = i.nextPowerUp) {
      if (
        i.removeFromGame === false &&
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
        i.removeFromGame = true;
      }
    }
  }
};

},{}],17:[function(require,module,exports){
module.exports = class {
  constructor(game) {
    this.game = game;
    this.radius = 5;
    this.speed = 2;
    this.positionX = Math.floor(Math.random() * game.canvas.width);
    this.positionY = null;
    this.color = game.powerUps.types[Math.floor(Math.random() * game.powerUps.types.length)];
    this.removeFromGame = false;
    this.nextPowerUp = null;
  }
  draw() {
    this.game.canvasContext.fillStyle = this.color;
    this.game.canvasContext.beginPath();
    this.game.canvasContext.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
    this.game.canvasContext.fill();
  }
  movement() {
    this.positionY += this.speed * (this.game.timer.deltaTime / (1000 / 60));
  }
  update() {
    if (this.removeFromGame) {
      this.game.powerUps.head = this.remove();
    }
    this.movement();
    this.boundaryCheck();
  }
  boundaryCheck() {
    if (this.positionY >= this.game.canvas.height) {
      this.removeFromGame = true;
    }
  }
  append() {
    if (this.game.powerUps.head == null) {
      return this;
    }
    for (let i = this.game.powerUps.head; i != null; i = i.nextPowerUp) {
      if (i.nextPowerUp == null) {
        i.nextPowerUp = this;
        i = i.nextPowerUp;
      }
    }
    return this.game.powerUps.head;
  }
  remove() {
    if (this.game.powerUps.head === this) {
      return this.game.powerUps.head.nextPowerUp;
    }
    for (let i = this.game.powerUps.head; i.nextPowerUp != null; i = i.nextPowerUp) {
      if (i.nextPowerUp === this) {
        i.nextPowerUp = i.nextPowerUp.nextPowerUp;
      }
      if (i.nextPowerUp == null) {
        return this.game.powerUps.head;
      }
    }
    return this.game.powerUps.head;
  }
};

},{}],18:[function(require,module,exports){
const PowerUp = require('../objects/powerUp/index.js');

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
  draw() {
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      i.draw();
    }
  },
  update() {
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      i.update();
    }
  },
  spawn(game) {
    this.config.spawn.countdown -= game.timer.deltaTime;
    if (this.config.spawn.countdown <= 0) {
      this.config.spawn.countdown += this.config.spawn.randomRate();
      game.powerUps.head = new PowerUp(game).append();
    }
  },
};

},{"../objects/powerUp/index.js":17}],19:[function(require,module,exports){
const gameEngine = require('./gameEngine.js');
const events = require('./events.js');

const socket = io();

window.onload = () => {
  gameEngine.init();
  gameEngine.start();
  events.listen(gameEngine);
};

},{"./events.js":7,"./gameEngine.js":8}],20:[function(require,module,exports){
module.exports = class {
  constructor() {
    this.gameTime = 0;
    this.currentTime = null;
    this.previousTimeStamp = 0;
    this.deltaTime = null;
  }
  tick() {
    this.currentTime = Date.now();
    if (this.previousTimeStamp === 0) {
      this.deltaTime = 17;
    } else {
      this.deltaTime = this.currentTime - this.previousTimeStamp;
    }
    this.previousTimeStamp = this.currentTime;
    this.gameTime += this.deltaTime;
    return this.deltaTime;
  }
};

},{}]},{},[19]);
