(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
  head: null,
  canvasFill(gameArea) {
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.canvasFill(gameArea.canvasElementDrawingContext);
    }
  },
  update(timeElapsed, boundary, components, Bullet, keyMap) {
    if (keyMap[13] === true) {
      const bullet = this.createNew(components, Bullet);
      this.appendNewBullet(bullet, components);
    }
    for (let i = this.head; i != null; i = i.nextBullet) {
      i.update(timeElapsed, boundary, components, Bullet);
    }
  },
  createNew(components, Bullet) {
    let bullet = {};
    switch (components.player.bulletType) {
      case 'white':
        bullet = new Bullet.Default(components.player);
        break;
      case 'orangered':
        bullet = new Bullet.Red(components.player);
        break;
      case 'deepskyblue':
        bullet = new Bullet.Blue(components.player);
        break;
      default:
        bullet = new Bullet.Default(components.player);
    }
    return bullet;
  },
  appendNewBullet(bullet, components) {
    components.bullets.head = bullet.append(components.bullets.head);
  },
};

},{}],2:[function(require,module,exports){
module.exports = {
  head: null,
  spawn: {
    countdown: null,
    rate: 1000,
  },
  canvasFill(gameArea) {
    for (let i = this.head; i != null; i = i.nextEnemy) {
      i.canvasFill(gameArea.canvasElementDrawingContext);
    }
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
    components.enemies.head = enemy.append(components.enemies.head);
  },
};

},{}],3:[function(require,module,exports){
const bullets = require('./bullets/index.js');
const enemies = require('./enemies/index.js');
const powerUps = require('./powerUps/index.js');

module.exports = {
  bullets,
  player: null,
  enemies,
  powerUps,
};

},{"./bullets/index.js":1,"./enemies/index.js":2,"./powerUps/index.js":4}],4:[function(require,module,exports){
module.exports = {
  head: null,
  spawn: {
    countdown: null,
    rate() {
      return Math.floor(Math.random() * 10000);
    },
  },
  types: ['deepskyblue', 'orangered', 'mediumpurple'],
  canvasFill(gameArea) {
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      i.canvasFill(gameArea.canvasElementDrawingContext);
    }
  },
  update(timeElapsed, components, PowerUp, gameArea) {
    this.spawnUpdate(timeElapsed, components, PowerUp);
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      i.update(timeElapsed, gameArea.canvasElement.height, components);
    }
  },
  spawnUpdate(timeElapsed, components, PowerUp) {
    components.powerUps.spawn.countdown -= timeElapsed;
    if (components.powerUps.spawn.countdown <= 0) {
      components.powerUps.spawn.countdown += components.powerUps.spawn.rate();
      const powerUp = this.createNew(PowerUp);
      this.appendNewPowerUp(components, powerUp);
    }
  },
  createNew(PowerUp) {
    const powerUp = new PowerUp(PowerUp.getDefaultSpec());
    powerUp.positionHorizontal = Math.floor(Math.random() * 1366);
    powerUp.color = this.types[Math.floor(Math.random() * 3)];
    return powerUp;
  },
  appendNewPowerUp(components, powerUp) {
    components.powerUps.head = powerUp.append(components.powerUps.head);
  },
};

},{}],5:[function(require,module,exports){
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
      components.enemies.head = this.remove(components.enemies.head);
    }
  }
  append(head) {
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
  remove(head) {
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
const Player = require('./player.js');
const Enemy = require('./enemy.js');

module.exports = {
  canvasElement: document.getElementById('canvas'),
  start(components) {
    this.canvasElement.width = 1366;
    this.canvasElement.height = 768;
    this.canvasElement.tabIndex = 1000;
    this.canvasElementDrawingContext = this.canvasElement.getContext('2d');
    components.player = new Player(this.canvasElement.width, this.canvasElement.height);
    const enemy = new Enemy(Enemy.getDefaultSpec());
    components.enemies.head = enemy.append(components.enemies.head);
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

},{"./enemy.js":5,"./player.js":16}],8:[function(require,module,exports){
const Default = require('./Default.js');

module.exports = class extends Default {
  constructor(player) {
    super(player);
    this.width = 30;
  }
  update(timeElapsed, boundary, components) {
    super.boundaryCheck(boundary, components);
    super.movement(timeElapsed);
    components.player.score += this.hitCheck(components.enemies.head);
  }
  hitCheck(enemyHead) {
    let hitCount = 0;
    for (let i = enemyHead; i != null; i = i.nextEnemy) {
      if (
        (
          (
            this.positionVertical >= i.positionVertical &&
            this.positionVertical <= i.positionVertical + i.height
          ) ||
          (
            this.positionVertical + this.height >= i.positionVertical &&
            this.positionVertical + this.height <= i.positionVertical + i.height
          )
        ) &&
        (
          (
            i.positionHorizontal >= this.positionHorizontal &&
            i.positionHorizontal <= this.positionHorizontal + this.width
          ) ||
          (
            i.positionHorizontal + i.width >= this.positionHorizontal &&
            i.positionHorizontal <= this.positionHorizontal + this.width
          )
        )
      ) {
        i.hitState = true;
        hitCount += 1;
      }
    }
    return hitCount;
  }
};

},{"./Default.js":9}],9:[function(require,module,exports){
module.exports = class {
  constructor(player) {
    this.width = 5;
    this.height = 10;
    this.speed = 20;
    this.positionHorizontal = player.positionHorizontal + ((player.width - this.width) / 2);
    this.positionVertical = player.positionVertical;
    this.state = true;
    this.type = player.bulletType;
    this.nextBullet = null;
  }
  movement(time) {
    if (this.state) {
      this.positionVertical -= this.speed * (time / (1000 / 60));
    }
  }

  boundaryCheck(boundary, components) {
    if (this.positionVertical + this.height <= boundary) {
      this.remove(components.bullets.head);
      this.state = false;
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
    for (let i = enemyHead; i != null; i = i.nextEnemy) {
      if (
        (
          (
            this.positionVertical >= i.positionVertical &&
            this.positionVertical <= i.positionVertical + i.height
          ) ||
          (
            this.positionVertical + this.height >= i.positionVertical &&
            this.positionVertical + this.height <= i.positionVertical + i.height
          )
        ) &&
        (
          (
            i.positionHorizontal >= this.positionHorizontal &&
            i.positionHorizontal <= this.positionHorizontal + this.width
          ) ||
          (
            i.positionHorizontal + i.width >= this.positionHorizontal &&
            i.positionHorizontal <= this.positionHorizontal + this.width
          )
        )
      ) {
        i.hitState = true;
        return true;
      }
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

},{}],10:[function(require,module,exports){
const Default = require('./Default.js');

module.exports = class extends Default {
  constructor(player) {
    super(player);
    this.test = 'test';
    this.leftPositionHorizontal = this.positionHorizontal - 5;
    this.leftPositionVertical = this.positionVertical;
    this.rightPositionHorizontal = this.positionHorizontal + 5;
    this.rightPositionVertical = this.positionVertical;
  }
  canvasFill(drawingContext) {
    super.canvasFill(drawingContext);
    drawingContext.fillRect(
      this.leftPositionHorizontal,
      this.leftPositionVertical,
      this.width,
      this.height,
    );
    drawingContext.fillRect(
      this.rightPositionHorizontal,
      this.rightPositionVertical,
      this.width,
      this.height,
    );
  }
  movement(time) {
    super.movement(time);
    if (this.state) {
      this.leftPositionVertical -= this.speed * (time / (1000 / 60));
      this.rightPositionVertical -= this.speed * (time / (1000 / 60));
    }
  }
};

},{"./Default.js":9}],11:[function(require,module,exports){
const Default = require('./Default.js');
const Red = require('./Red.js');
const Blue = require('./Blue.js');

module.exports = {
  Default,
  Red,
  Blue,
};

},{"./Blue.js":8,"./Default.js":9,"./Red.js":10}],12:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],13:[function(require,module,exports){
const Bullet = require('./bullet/index.js');
const Enemy = require('./enemy/Enemy.js');
const PowerUp = require('./powerUp/PowerUp.js');
const Player = require('./player/Player.js');

module.exports = {
  Bullet,
  Enemy,
  PowerUp,
  Player,
}


},{"./bullet/index.js":11,"./enemy/Enemy.js":12,"./player/Player.js":14,"./powerUp/PowerUp.js":15}],14:[function(require,module,exports){
module.exports = class {
  constructor(canvasWidth, canvasHeight) {
    this.width = 30;
    this.height = 20;
    this.positionHorizontal = canvasWidth / 2;
    this.positionVertical = canvasHeight - 20;
    this.score = 0;
    this.speed = 5;
    this.bulletType = 'white';
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
        this.bulletType = i.color;
        i.stateObtained = true;
      }
    }
  }
};

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"dup":14}],17:[function(require,module,exports){
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

},{"./components/index.js":3,"./event.js":6,"./gameArea.js":7,"./objects/index.js":13}]},{},[17]);
