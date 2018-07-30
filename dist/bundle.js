(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const Bullet = require('../objects/bullet/index.js');
const { blue } = require('./config.js');

module.exports = {
  config: blue,
  createBlue(game, player) {
    let bullet = {};
    switch (player.bulletLevel) {
      case 1:
        bullet = new Bullet.Blue(
          game,
          player,
          this.config.level1.width,
          this.config.level1.height,
        );
        break;
      case 2:
        bullet = new Bullet.Blue(
          game,
          player,
          this.config.level2.width,
          this.config.level2.height,
        );
        break;
      case 3:
        bullet = new Bullet.Blue(
          game,
          player,
          this.config.level3.width,
          this.config.level3.height,
        );
        break;
      case 4:
        bullet = new Bullet.Blue(
          game,
          player,
          this.config.level4.width,
          this.config.level4.height,
        );
        break;
      case 5:
        bullet = new Bullet.Blue(
          game,
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

const Player = require('../objects/player/index.js');
const Enemy = require('../objects/enemy/index.js');

module.exports = class {
  constructor(game) {
    this.game = game;
    this.entities = [];
    this.bulletCount = 0;
    this.bulletCountPurple = 0;
    this.head = null;
  }
  draw() {
    for (let i = 0; this.game.bullets.entities[i] != null; i += 1) {
      if (this.game.bullets.entities[i].type !== 'mediumpurple') {
        this.game.canvasContext.fillStyle = this.game.bullets.entities[i].type;
        this.game.canvasContext.fillRect(
          this.game.bullets.entities[i].positionX,
          this.game.bullets.entities[i].positionY,
          this.game.bullets.entities[i].width,
          this.game.bullets.entities[i].height,
        );
      } else if (this.game.bullets.entities[i].type === 'mediumpurple') {
        this.game.canvasContext.strokeStyle = 'mediumpurple';
        this.game.canvasContext.lineWidth = 2;
        this.game.canvasContext.lineCap = 'round';
        this.game.canvasContext.beginPath();
        this.game.canvasContext.moveTo(
          this.game.bullets.entities[i].positionX,
          this.game.bullets.entities[i].positionY,
        );
        this.game.canvasContext.quadraticCurveTo(
          this.game.bullets.entities[i].controlPositionX,
          this.game.bullets.entities[i].controlPositionY,
          this.game.bullets.entities[i].enemyPositionX,
          this.game.bullets.entities[i].enemyPositionY,
        );
        this.game.canvasContext.stroke();
      }
    }
  }
  update(time) {
    for (let i = this.entities.length - 1; i >= 0; i -= 1) {
      if (this.entities[i].removeFromGame === true) {
        if (this.entities[i].type === 'mediumpurple') {
          this.bulletCountPurple -= 1;
        }
        this.entities.splice(i, 1);
      }
    }
    for (let i = 0; i < this.entities.length; i += 1) {
      this.entities[i].update(time);
    }
  }
  addBullet(bullet) {
    this.entities.push(bullet);
    if (bullet.type === 'mediumpurple') {
      this.bulletCountPurple += 1;
    }
  }
  create(player) {
    let bulletArray = [];
    switch (player.bulletType) {
      case 'white':
        bulletArray[0] = new Bullet.Default(this.game, player);
        this.addBullet(bulletArray[0]);
        break;
      case 'orangered': {
        bulletArray = red.createRed(this.game, player);
        for (let i = 0; bulletArray[i] != null; i += 1) {
          this.addBullet(bulletArray[i]);
        }
        break;
      }
      case 'deepskyblue':
        bulletArray[0] = blue.createBlue(this.game, player);
        this.addBullet(bulletArray[0]);
        break;
      case 'mediumpurple':
        bulletArray[0] = purple.createPurple(this.game, player);
        if (bulletArray[0] != null) {
          this.addBullet(bulletArray[0]);
        }
        break;
      default:
        bulletArray[0] = new Bullet.Default(this.game, player);
        this.addBullet(bulletArray[0]);
    }
    return bulletArray;
  }
  getState() {
    const state = [];
    for (let i = 0; i < this.entities.length; i += 1) {
      state.push(this.entities[i].getState());
    }
    return state;
  }
  updateWithServerState() {
    this.entities = [];
    for (let i = 0; this.game.serverState.bullets.entities[i] != null; i += 1) {
      switch (this.game.serverState.bullets.entities[i].type) {
        case 'white': {
          const player = new Player(this.game, 'id');
          const bulletDefault = new Bullet.Default(this.game, player);
          Object.keys(this.game.serverState.bullets.entities[i]).forEach((key) => {
            bulletDefault[key] = this.game.serverState.bullets.entities[i][key];
          });
          this.entities[i] = bulletDefault;
          break;
        }
        case 'orangered': {
          const player = new Player(this.game, 'id');
          const bulletRed = new Bullet.Red(this.game, player, 10);
          Object.keys(this.game.serverState.bullets.entities[i]).forEach((key) => {
            bulletRed[key] = this.game.serverState.bullets.entities[i][key];
          });
          this.entities[i] = bulletRed;
          break;
        }
        case 'deepskyblue': {
          const player = new Player(this.game, 'id');
          const bulletBlue = new Bullet.Blue(this.game, player, 10, 10);
          Object.keys(this.game.serverState.bullets.entities[i]).forEach((key) => {
            bulletBlue[key] = this.game.serverState.bullets.entities[i][key];
          });
          this.entities[i] = bulletBlue;
          break;
        }
        case 'mediumpurple': {
          const player = new Player(this.game, 'id');
          const enemy = new Enemy(this.game);
          const bulletPurple = new Bullet.Purple(this.game, player, enemy);
          Object.keys(this.game.serverState.bullets.entities[i]).forEach((key) => {
            bulletPurple[key] = this.game.serverState.bullets.entities[i][key];
          });
          const targetEnemy = this.game.enemies.entities.find(obj => (
            obj.id === bulletPurple.enemyId
          ));
          const targetPlayer = this.game.players.entities[bulletPurple.playerId];
          bulletPurple.targetEnemy = targetEnemy;
          bulletPurple.targetPlayer = targetPlayer;
          this.entities[i] = bulletPurple;
          break;
        }
        default: {
          const player = new Player(this.game, 'id');
          const bulletDefault = new Bullet.Default(this.game, player);
          Object.keys(this.game.serverState.bullets.entities[i]).forEach((key) => {
            bulletDefault[key] = this.game.serverState.bullets.entities[i][key];
          });
          this.entities[i] = bulletDefault;
        }
      }
    }
  }
};

},{"../objects/bullet/index.js":11,"../objects/enemy/index.js":15,"../objects/player/index.js":16,"./blue.js":1,"./purple.js":4,"./red.js":5}],4:[function(require,module,exports){
const Bullet = require('../objects/bullet/index.js');
const { purple } = require('./config.js');

module.exports = {
  config: purple,
  createPurple(game, player) {
    const findRandomUntargettedEnemy = () => {
      const untargettedEnemiesCount = game.enemies.entities.length - game.enemies.targettedCount;
      if (untargettedEnemiesCount === 0) {
        return null;
      }
      let randomUntargettedEnemy = Math.floor(Math.random() * untargettedEnemiesCount) + 1;
      for (let i = 0; randomUntargettedEnemy > 0; i += 1) {
        if (game.enemies.entities[i].stateTargetted === false) {
          randomUntargettedEnemy -= 1;
        }
        if (randomUntargettedEnemy === 0) {
          return game.enemies.entities[i];
        }
      }
      return null; // restructure so this return has meaning
    };
    const enemy = findRandomUntargettedEnemy();
    if (enemy == null) {
      return null;
    }
    switch (player.bulletLevel) {
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
    return new Bullet.Purple(game, player, enemy);
  },
};

},{"../objects/bullet/index.js":11,"./config.js":2}],5:[function(require,module,exports){
const Bullet = require('../objects/bullet/index.js');
const { red } = require('./config.js');

module.exports = {
  config: red,
  createRed(game, player) {
    const bulletArray = [];
    switch (player.bulletLevel) {
      case 1:
        bulletArray[0] = new Bullet.Red(game, player, -this.config.level1.offset);
        bulletArray[1] = new Bullet.Red(game, player, this.config.level1.offset);
        break;
      case 2:
        bulletArray[0] = new Bullet.Red(game, player, -this.config.level2.offset);
        bulletArray[1] = new Bullet.Red(game, player, 0);
        bulletArray[2] = new Bullet.Red(game, player, this.config.level2.offset);
        break;
      case 3:
        bulletArray[0] = new Bullet.RedAngled(
          game,
          player,
          -this.config.level3.offset,
          -this.config.level3.angle,
        );
        bulletArray[1] = new Bullet.Red(game, player, -this.config.level3.offset);
        bulletArray[2] = new Bullet.Red(game, player, 0);
        bulletArray[3] = new Bullet.Red(game, player, this.config.level3.offset);
        bulletArray[4] = new Bullet.RedAngled(
          game,
          player,
          this.config.level3.offset,
          this.config.level3.angle,
        );
        break;
      case 4:
        bulletArray[0] = new Bullet.RedAngled(
          game,
          player,
          -this.config.level4.offset,
          -this.config.level4.angleOuter,
        );
        bulletArray[1] = new Bullet.RedAngled(
          game,
          player,
          -this.config.level4.offset,
          -this.config.level4.angleInner,
        );
        bulletArray[2] = new Bullet.Red(game, player, -this.config.level4.offset);
        bulletArray[3] = new Bullet.Red(game, player, 0);
        bulletArray[4] = new Bullet.Red(game, player, this.config.level4.offset);
        bulletArray[5] = new Bullet.RedAngled(
          game,
          player,
          this.config.level4.offset,
          this.config.level4.angleInner,
        );
        bulletArray[6] = new Bullet.RedAngled(
          game,
          player,
          this.config.level4.offset,
          this.config.level4.angleOuter,
        );
        break;
      case 5:
        bulletArray[0] = new Bullet.RedAngled(
          game,
          player,
          -this.config.level5.offset,
          -this.config.level5.angleOuter,
        );
        bulletArray[1] = new Bullet.RedAngled(
          game,
          player,
          -this.config.level5.offset,
          -this.config.level5.angleMiddle,
        );
        bulletArray[2] = new Bullet.RedAngled(
          game,
          player,
          -this.config.level5.offset,
          -this.config.level5.angleInner,
        );
        bulletArray[3] = new Bullet.Red(game, player, -this.config.level5.offset);
        bulletArray[4] = new Bullet.Red(game, player, 0);
        bulletArray[5] = new Bullet.Red(game, player, this.config.level5.offset);
        bulletArray[6] = new Bullet.RedAngled(
          game,
          player,
          this.config.level5.offset,
          this.config.level5.angleInner,
        );
        bulletArray[7] = new Bullet.RedAngled(
          game,
          player,
          this.config.level5.offset,
          this.config.level5.angleMiddle,
        );
        bulletArray[8] = new Bullet.RedAngled(
          game,
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

},{"../objects/bullet/index.js":11,"./config.js":2}],6:[function(require,module,exports){
const GameEngine = require('./gameEngine.js');

module.exports = class extends GameEngine {
  constructor() {
    super();
    this.id = null;
    this.input = {
      step: 0,
      data: [],
      time: null,
    };
    this.storedInputs = []; // used for interpolation from received server state
    this.updateWithServerStateRequired = false;
    this.serverState = null;
  }
  init() {
    super.init();
    this.canvas.tabIndex = 1000;
    this.canvas.focus();
    this.canvasContext = this.canvas.getContext('2d');
  }
  start(socket) {
    const gameLoop = () => {
      this.timer.tick();
      this.sendInputToServer(socket);
      this.storeInput();

      if (this.updateWithServerStateRequired === true) {
        this.updateWithServerState(socket);
        this.applySavedInputs();
        this.updateWithServerStateRequired = false;
      } else {
        this.update(this.input.data, this.timer.deltaTime);
      }
      this.draw();
      window.requestAnimationFrame(gameLoop);
    };
    gameLoop();
  }
  storeInput() {
    this.storedInputs.push({
      step: this.input.step,
      data: this.input.data.slice(0),
      time: this.timer.deltaTime,
    });
  }
  updateWithServerState() {
    this.players.updateWithServerState();
    this.enemies.updateWithServerState();
    this.powerUps.updateWithServerState();
    this.bullets.updateWithServerState();
  }
  applySavedInputs() {
    // remove inputs that have already been applied by the server
    const client = this.serverState.clients.find(obj => obj.id === this.id);
    if (client !== undefined) { // occurs when receiving serverState of nonexisting clients
      for (let i = 0; this.storedInputs[i] != null; i += 1) {
        if (this.storedInputs[i].step === client.input.step) {
          this.storedInputs.splice(0, i + 1);
        }
      }
      // apply inputs to interpolate current game state
      for (let i = 0; this.storedInputs[i] != null; i += 1) {
        this.update(this.storedInputs[i].data, this.storedInputs[i].time);
      }
    }
  }
  sendInputToServer(socket) {
    this.input.step += 1;
    socket.emit('input', {
      data: this.input.data,
      step: this.input.step,
    });
  }
  draw() {
    this.drawBackground();
    this.players.draw();
    this.enemies.draw();
    this.powerUps.draw();
    this.bullets.draw();
  }
  drawBackground() {
    this.canvasContext.font = 'bold 48px Arial, sans-serif';
    this.canvasContext.fillStyle = 'black';
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContext.fillStyle = 'white';
  }
  update(input, time) {
    this.players.update(input, time);
    this.enemies.update(time);
    this.bullets.update(time);
    this.powerUps.update(time);
  }
};

},{"./gameEngine.js":8}],7:[function(require,module,exports){
const Enemy = require('../objects/enemy/index.js');

module.exports = class {
  constructor(game) {
    this.game = game;
    this.entities = [];
    this.idCount = 0;
    this.head = null;
    this.count = 0;
    this.targettedCount = 0;
    this.totalTime = 0;
    this.config = {
      spawn: {
        countdown: 1000,
        rate: 1000,
      },
    };
  }
  draw() {
    for (let i = 0; i < this.game.enemies.entities.length; i += 1) {
      this.game.canvasContext.fillRect(
        this.game.enemies.entities[i].positionX,
        this.game.enemies.entities[i].positionY,
        this.game.enemies.entities[i].width,
        this.game.enemies.entities[i].height,
      );
    }
  }
  update(time) {
    for (let i = this.entities.length - 1; i >= 0; i -= 1) {
      if (this.entities[i].removeFromGame === true) {
        if (this.entities[i].stateTargetted === true) {
          this.targettedCount -= 1;
        }
        this.entities.splice(i, 1);
      }
    }
    for (let i = 0; i < this.entities.length; i += 1) {
      this.entities[i].update(time);
    }
  }
  addEnemy(enemy) {
    this.idCount += 1;
    this.entities.push(enemy);
  }
  spawn() {
    this.config.spawn.countdown -= this.game.timer.deltaTime;
    if (this.config.spawn.countdown <= 0) {
      this.config.spawn.countdown += this.config.spawn.rate;
      this.addEnemy(new Enemy(this.game));
    }
  }
  getState() {
    const state = [];
    for (let i = 0; i < this.entities.length; i += 1) {
      state.push(this.entities[i].getState());
    }
    return state;
  }
  updateWithServerState() {
    this.entities = [];
    for (let i = 0; this.game.serverState.enemies.entities[i] != null; i += 1) {
      const enemy = new Enemy(this.game);
      Object.keys(this.game.serverState.enemies.entities[i]).forEach((key) => {
        enemy[key] = this.game.serverState.enemies.entities[i][key];
      });
      this.entities[i] = enemy;
    }
  }
};

},{"../objects/enemy/index.js":15}],8:[function(require,module,exports){
const Timer = require('./timer.js');
const Bullets = require('./bullets/index.js');
const Enemies = require('./enemies/index.js');
const PowerUps = require('./powerUps/index.js');
const Players = require('./players/index.js');

module.exports = class {
  constructor() {
    this.bullets = new Bullets(this);
    this.enemies = new Enemies(this);
    this.powerUps = new PowerUps(this);
    this.players = new Players(this);
    this.canvas = null;
  }
  init() {
    this.timer = new Timer();
    this.canvas.width = 1366;
    this.canvas.height = 768;
  }
  spawn() {
    this.enemies.spawn();
    this.powerUps.spawn();
  }
};

},{"./bullets/index.js":3,"./enemies/index.js":7,"./players/index.js":18,"./powerUps/index.js":19,"./timer.js":21}],9:[function(require,module,exports){
const Default = require('./default.js');

module.exports = class extends Default {
  constructor(game, player, width, height) {
    super(game, player);
    this.width = width;
    this.height = height;
    this.positionX = player.positionX + ((player.width - this.width) / 2);
    this.positionY = player.positionY;
  }
  update(time) {
    super.boundaryCheck();
    super.movement(time);
    this.hitCheck();
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
        if (super.constructor.rectangleCollision(Ax1, Ax2, Ay1, Ay2, Bx1, Bx2, By1, By2)) {
          enemy.removeFromGame = true;
          this.game.players.entities[this.playerId].score += 1;
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
  constructor(game, player, enemy) {
    super(game, player);
    this.positionX = player.positionX + (player.width / 2);
    this.positionY = player.positionY;
    this.enemyPositionX = enemy.positionX + (enemy.width / 2);
    this.enemyPositionY = enemy.positionY + (enemy.height / 2);
    this.controlPositionX = Math.floor(Math.random() * game.canvas.width);
    this.controlPositionY = Math.floor(Math.random() * game.canvas.height);
    this.reqKillTime = 500;
    this.targetEnemy = enemy;
    this.targetPlayer = player;
    this.enemyId = enemy.id;
    if (enemy.stateTargetted === false) {
      game.enemies.targettedCount += 1;
    }
    enemy.stateTargetted = true;
  }
  update(time) {
    this.movement();
    this.killCheck(time);
  }
  killCheck(time) {
    this.reqKillTime -= time;
    if (this.reqKillTime <= 0) {
      this.removeFromGame = true;
      this.targetEnemy.removeFromGame = true;
      this.game.players.entities[this.playerId].score += 1;
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
};

},{"./default.js":10}],13:[function(require,module,exports){
const Default = require('./default.js');

module.exports = class extends Default {
  constructor(game, player, offset) {
    super(game, player);
    this.positionX = (player.positionX + ((player.width - this.width) / 2)) + offset;
  }
};

},{"./default.js":10}],14:[function(require,module,exports){
const Default = require('./default.js');

module.exports = class extends Default {
  constructor(game, player, offset, angle) {
    super(game, player);
    this.offset = offset;
    this.angle = angle;
    this.positionX = (player.positionX + ((player.width - this.width) / 2)) + this.offset;
  }
  movement(time) {
    this.positionX += this.angle * this.speed * (time / (1000 / 60));
    this.positionY -= this.speed * (time / (1000 / 60));
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
    this.id = game.enemies.idCount;
  }
  draw() {
    this.game.canvasContext.fillRect(
      this.positionX,
      this.positionY,
      this.width,
      this.height,
    );
  }
  movement(time) {
    this.positionX += this.speed * (time / (1000 / 60));
  }
  boundaryCheck() {
    if (this.positionX <= 0 && this.speed < 0) {
      this.speed = -this.speed;
    } else if ((this.positionX + this.width) >= this.game.canvas.width && this.speed > 0) {
      this.speed = -this.speed;
    }
  }
  update(time) {
    this.movement(time);
    this.boundaryCheck();
  }
  getState() {
    let state = {};
    Object.keys(this).forEach((key) => {
      if (key !== 'game' && key !== 'nextEnemy') {
        state = { ...state, ...{ [key]: this[key] } };
      }
    });
    return state;
  }
};

},{}],16:[function(require,module,exports){
module.exports = class {
  constructor(game, id) {
    this.game = game;
    this.width = 30;
    this.height = 20;
    this.positionX = game.canvas.width / 2;
    this.positionY = game.canvas.height - 25;
    this.speedXInitial = 0;
    this.speedYInitial = 0;
    this.speedXFinal = 0;
    this.speedYFinal = 0;
    this.maxSpeed = 5;
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.acceleration = 1.2;
    this.friction = 0.3;
    this.bulletType = 'white';
    this.bulletLevel = 0;
    this.maxBulletLevel = 5;
    this.score = 0;
    this.socketId = id;
    this.keyMap = [];
    this.inputSequence = 0;
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
  update(input, time) {
    this.movement(input, time);
    this.powerUpCollisionCheck();
    if (input[13] === true) {
      this.game.bullets.create(this);
    }
  }
  movement(input, time) {
    this.positionXUpdate(time);
    this.positionYUpdate(time);
    this.speedXUpdate(time);
    this.speedYUpdate(time);
    this.accelerateXUpdate(input);
    this.accelerateYUpdate(input);
  }
  positionXUpdate(time) {
    this.positionX +=
      ((this.speedXInitial + this.speedXFinal) * (time / (1000 / 60))) / 2;
    // check if within boundaries
    if (this.positionX < 0) {
      this.positionX = 0;
    } else if (this.positionX + this.width > this.game.canvas.width) {
      this.positionX = this.game.canvas.width - this.width;
    }
  }
  positionYUpdate(time) {
    this.positionY +=
      ((this.speedYInitial + this.speedYFinal) * (time / (1000 / 60))) / 2;
    // check if within boundaries
    if (this.positionY < 0) {
      this.positionY = 0;
    } else if (this.positionY + this.height > this.game.canvas.height) {
      this.positionY = this.game.canvas.height - this.height;
    }
  }
  speedXUpdate(time) {
    // set initial speed to final speed of last loop
    this.speedXInitial = this.speedXFinal;
    this.speedXFinal += this.accelerationX * (time / (1000 / 60));
    // apply friction, doesn't account for case when speed changes signs,
    // but should have negligible impact
    if (this.speedXFinal > 0) {
      this.speedXFinal -= this.friction * (time / (1000 / 60));
      if (this.speedXFinal < 0) {
        this.speedXFinal = 0;
      }
    } else if (this.speedXFinal < 0) {
      this.speedXFinal += this.friction * (time / (1000 / 60));
      if (this.speedXFinal > 0) {
        this.speedXFinal = 0;
      }
    }
    if (this.speedXFinal < -this.maxSpeed) {
      this.speedXFinal = -this.maxSpeed;
    } else if (this.speedXFinal > this.maxSpeed) {
      this.speedXFinal = this.maxSpeed;
    }
  }
  speedYUpdate(time) {
    this.speedYInitial = this.speedYFinal;
    this.speedYFinal += this.accelerationY * (time / (1000 / 60));
    // apply friction, doesn't account for case when speed changes signs,
    // but should have negligible impact
    if (this.speedYFinal > 0) {
      this.speedYFinal -= this.friction * (time / (1000 / 60));
      if (this.speedYFinal < 0) {
        this.speedYFinal = 0;
      }
    } else if (this.speedYFinal < 0) {
      this.speedYFinal += this.friction * (time / (1000 / 60));
      if (this.speedYFinal > 0) {
        this.speedYFinal = 0;
      }
    }
    if (this.speedYFinal < -this.maxSpeed) {
      this.speedYFinal = -this.maxSpeed;
    } else if (this.speedYFinal > this.maxSpeed) {
      this.speedYFinal = this.maxSpeed;
    }
  }
  accelerateXUpdate(input) {
    if (input[37] === true && input[39] !== true) {
      this.accelerationX = -this.acceleration;
    } else if (input[37] !== true && input[39] === true) {
      this.accelerationX = this.acceleration;
    } else if (
      (input[37] !== true && input[39] !== true) ||
      (input[37] === true && input[39] === true)
    ) {
      this.accelerationX = 0;
    }
  }
  accelerateYUpdate(input) {
    if (input[38] === true && input[40] !== true) {
      this.accelerationY = -this.acceleration;
    } else if (input[38] !== true && input[40] === true) {
      this.accelerationY = this.acceleration;
    } else if (
      (input[38] !== true && input[40] !== true) ||
      (input[38] === true && input[40] === true)
    ) {
      this.accelerationY = 0;
    }
  }
  powerUpCollisionCheck() {
    for (let i = 0; i < this.game.powerUps.entities.length; i += 1) {
      const powerUp = this.game.powerUps.entities[i];
      if (
        powerUp.removeFromGame === false &&
        powerUp.positionX >= this.positionX &&
        powerUp.positionX <= this.positionX + this.width &&
        powerUp.positionY >= this.positionY &&
        powerUp.positionY <= this.positionY + this.height
      ) {
        if (this.bulletType === powerUp.color) {
          if (this.bulletLevel < this.maxBulletLevel) {
            this.bulletLevel += 1;
          }
        } else {
          this.bulletType = powerUp.color;
          this.bulletLevel = 1;
        }
        powerUp.removeFromGame = true;
      }
    }
  }
  getState() {
    let state = {};
    Object.keys(this).forEach((key) => {
      if (key !== 'game') {
        state = { ...state, ...{ [key]: this[key] } };
      }
    });
    return state;
  }
};

},{}],17:[function(require,module,exports){
module.exports = class {
  constructor(game) {
    this.game = game;
    this.radius = 5;
    this.speed = 2;
    this.positionX = Math.floor(Math.random() * (game.width || game.canvas.width)); // temp
    this.positionY = -200;
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
  movement(time) {
    this.positionY += this.speed * (time / (1000 / 60));
  }
  update(time) {
    this.movement(time);
    this.boundaryCheck();
  }
  boundaryCheck() {
    if (this.positionY >= this.game.canvas.height) {
      this.removeFromGame = true;
    }
  }
  getState() {
    let state = {};
    Object.keys(this).forEach((key) => {
      if (key !== 'game' && key !== 'nextPowerUp') {
        state = { ...state, ...{ [key]: this[key] } };
      }
    });
    return state;
  }
};

},{}],18:[function(require,module,exports){
const Player = require('../objects/player/index.js');

module.exports = class {
  constructor(game) {
    this.game = game;
    this.entities = {};
  }
  update(input, time) {
    Object.keys(this.entities).forEach((key) => {
      if (key === this.game.id) {
        this.entities[key].update(input, time);
      }
    });
  }
  updateServer(clients, time) {
    Object.keys(this.entities).forEach((id) => {
      const inputData = clients.find(obj => obj.id === id).input.data;
      this.entities[id].update(inputData, time);
    });
  }
  getState() {
    const state = {};
    Object.keys(this.entities).forEach((key) => {
      state[key] = this.entities[key].getState();
    });
    return state;
  }
  draw() {
    Object.keys(this.game.players.entities).forEach((key) => {
      this.game.canvasContext.fillRect(
        this.game.players.entities[key].positionX,
        this.game.players.entities[key].positionY,
        this.game.players.entities[key].width,
        this.game.players.entities[key].height,
      );
    });
  }
  updateWithServerState() {
    this.entities = {};
    Object.keys(this.game.serverState.players.entities).forEach((id) => {
      this.entities[id] = new Player(this.game, id);
      Object.keys(this.game.serverState.players.entities[id]).forEach((key) => {
        this.entities[id][key] = this.game.serverState.players.entities[id][key];
      });
    });
  }
};

},{"../objects/player/index.js":16}],19:[function(require,module,exports){
const PowerUp = require('../objects/powerUp/index.js');

module.exports = class {
  constructor(game) {
    this.game = game;
    this.entities = [];
    this.config = {
      spawn: {
        countdown: null,
        rate: 1000,
        randomRate() {
          return Math.floor(Math.random() * this.rate);
        },
      },
    };
    this.types = ['deepskyblue', 'orangered', 'mediumpurple'];
  }
  draw() {
    for (let i = 0; i < this.game.powerUps.entities.length; i += 1) {
      this.game.canvasContext.fillStyle = this.game.powerUps.entities[i].color;
      this.game.canvasContext.beginPath();
      this.game.canvasContext.arc(
        this.game.powerUps.entities[i].positionX,
        this.game.powerUps.entities[i].positionY,
        this.game.powerUps.entities[i].radius,
        0,
        2 * Math.PI,
      );
      this.game.canvasContext.fill();
    }
  }
  update(time) {
    for (let i = this.entities.length - 1; i >= 0; i -= 1) {
      if (this.entities[i].removeFromGame === true) {
        this.entities.splice(i, 1);
      }
    }
    for (let i = 0; i < this.entities.length; i += 1) {
      this.entities[i].update(time);
    }
  }
  addPowerUp(powerUp) {
    this.entities.push(powerUp);
  }
  spawn() {
    this.config.spawn.countdown -= this.game.timer.deltaTime;
    if (this.config.spawn.countdown <= 0) {
      this.config.spawn.countdown += this.config.spawn.randomRate();
      this.addPowerUp(new PowerUp(this.game));
    }
  }
  getState() {
    const state = [];
    for (let i = 0; i < this.entities.length; i += 1) {
      state.push(this.entities[i].getState());
    }
    return state;
  }
  updateWithServerState() {
    this.entities = [];
    for (let i = 0; this.game.serverState.powerUps.entities[i] != null; i += 1) {
      const powerUp = new PowerUp(this.game);
      Object.keys(this.game.serverState.powerUps.entities[i]).forEach((key) => {
        powerUp[key] = this.game.serverState.powerUps.entities[i][key];
      });
      this.entities[i] = powerUp;
    }
  }
};

},{"../objects/powerUp/index.js":17}],20:[function(require,module,exports){
const ClientEngine = require('./clientEngine.js');

const socket = io();

window.onload = () => {
  const clientEngine = new ClientEngine();
  clientEngine.canvas = document.getElementById('canvas');
  clientEngine.init();
  clientEngine.start(socket);
  console.log(`initial socket: ${socket.id}`); // eslint-disable-line no-console

  socket.on('update', (data) => {
    clientEngine.id = socket.id;
    clientEngine.serverState = data;
    clientEngine.updateWithServerStateRequired = true;
  });

  socket.on('connect', () => { // why does this do nothing in chrome??
    console.log(`connect: ${socket.id}`); // eslint-disable-line no-console
  });

  ['keydown', 'keyup'].forEach((eventListener) => {
    clientEngine.canvas.addEventListener(eventListener, (e) => {
      if (e.keyCode !== 116 && e.keyCode !== 123) {
        e.preventDefault();
      }
      clientEngine.input.data[e.keyCode] = e.type === 'keydown';
    });
  });
};

},{"./clientEngine.js":6}],21:[function(require,module,exports){
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

},{}]},{},[20]);
