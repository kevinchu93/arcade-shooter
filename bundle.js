(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = class {
  constructor(obj) {
    this.width = obj.width;
    this.height = obj.height;
    this.speed = obj.speed;
    this.positionHorizontal = obj.positionHorizontal;
    this.positionVertical = obj.positionVertical;
    this.state = obj.state;
    this.nextBullet = obj.nextBullet;
  }
  static getDefaultSpec() {
    return {
      width: 5,
      height: 10,
      speed: 20,
      positionHorizontal: undefined,
      positionVertical: undefined, // canvas height - height
      state: true,
      nextBullet: null,
    };
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

},{}],2:[function(require,module,exports){
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
    const bullet = new Bullet(Bullet.getDefaultSpec());
    bullet.positionHorizontal =
      components.player.positionHorizontal + ((components.player.width - bullet.width) / 2);
    bullet.positionVertical = components.player.positionVertical;
    return bullet;
  },
  appendNewBullet(bullet, components) {
    components.bullets.head = bullet.append(components.bullets.head);
  },
};

},{}],3:[function(require,module,exports){
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
      const enemy = this.createNew(components, Enemy);
      this.appendNewEnemy(components, enemy);
    }
  },
  createNew(components, Enemy) {
    const enemy = new Enemy(Enemy.getDefaultSpec());
    return enemy;
  },
  appendNewEnemy(components, enemy) {
    components.enemies.head = enemy.append(components.enemies.head);
  },
};

},{}],4:[function(require,module,exports){
const bullets = require('./bullets/index.js');
const enemies = require('./enemies/index.js');
const powerUps = require('./powerUps/index.js');

module.exports = {
  bullets: bullets,
  player: null,
  enemies: enemies, 
  powerUps: powerUps,
};

},{"./bullets/index.js":2,"./enemies/index.js":3,"./powerUps/index.js":5}],5:[function(require,module,exports){
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
  update(timeElapsed, components, PowerUp) {
    this.spawnUpdate(timeElapsed, components, PowerUp);
    for (let i = this.head; i != null; i = i.nextPowerUp) {
      i.update(timeElapsed);
    }
  },
  spawnUpdate(timeElapsed, components, PowerUp) {
    components.powerUps.spawn.countdown -= timeElapsed;
    if (components.powerUps.spawn.countdown <= 0) {
      components.powerUps.spawn.countdown += components.powerUps.spawn.rate();
      const powerUp = this.createNew(components, PowerUp);
      this.appendNewPowerUp(components, powerUp);
    }
  },
  createNew(components, PowerUp) {
    const powerUp = new PowerUp(PowerUp.getDefaultSpec());
    powerUp.positionHorizontal = Math.floor(Math.random() * 1366);
    powerUp.color = this.types[Math.floor(Math.random() * 3)];
    return powerUp;
  },
  appendNewPowerUp(components, powerUp) {
    components.powerUps.head = powerUp.append(components.powerUps.head);
  },
};

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
module.exports = class {
  static mouseMove(canvasElement, player) {
    canvasElement.addEventListener('mousemove', (e) => {
      player.positionHorizontal = e.clientX;
    });
  }

  static click(canvasElement, Bullet, components, player) {
    canvasElement.addEventListener('click', () => {
      const bullet = new Bullet(Bullet.getDefaultSpec());
      bullet.positionHorizontal = player.positionHorizontal + ((player.width - bullet.width) / 2);
      bullet.positionVertical = player.positionVertical;
      components.bullets.head = bullet.append(components.bullets.head);
    });
  }
  static keyInput(canvasElement, components, Bullet, keyMap) {
    ['keydown', 'keyup'].forEach((eventListener) => {
      canvasElement.addEventListener(eventListener, (e) => {
        keyMap[e.keyCode] = e.type === 'keydown';
      });
    });
  }
};

},{}],8:[function(require,module,exports){
const Player = require('./player.js');
const Enemy = require('./enemy.js');

module.exports = {
  canvasElement: document.getElementById('canvas'),
  start(components) {
    this.canvasElement.width = 1366;
    this.canvasElement.height = 768;
    this.canvasElement.tabIndex = 1000;
    this.canvasElementDrawingContext = this.canvasElement.getContext('2d');
    components.player = new Player(Player.getDefaultSpec(
      this.canvasElement.width,
      this.canvasElement.height,
    ));
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

},{"./enemy.js":6,"./player.js":9}],9:[function(require,module,exports){
module.exports = class {
  constructor(obj) {
    this.width = obj.width;
    this.height = obj.height;
    this.positionHorizontal = obj.positionHorizontal;
    this.positionVertical = obj.positionVertical;
    this.score = obj.score;
    this.speed = obj.speed;
  }
  static getDefaultSpec(canvasWidth, canvasHeight) {
    return {
      width: 15,
      height: 20,
      positionHorizontal: (canvasWidth) / 2,
      positionVertical: canvasHeight - 20, // canvas height - height
      score: 0,
      speed: 5,
    };
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
  update(timeElapsed, canvasElement, keyMap) {
    this.movementLeft(keyMap, timeElapsed, 0);
    this.movementRight(keyMap, timeElapsed, canvasElement.width);
    this.movementUp(keyMap, timeElapsed, 0);
    this.movementDown(keyMap, timeElapsed, canvasElement.height);
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
};

},{}],10:[function(require,module,exports){
module.exports = class {
  constructor(obj) {
    this.radius = obj.radius;
    this.speed = obj.speed;
    this.positionHorizontal = obj.positionHorizontal;
    this.positionVertical = obj.positionVertical;
    this.color = obj.color;
  }
  static getDefaultSpec() {
    return {
      radius: 5,
      speed: 2,
      positionHorizontal: null,
      positionVertical: null,
      color: null,
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
  update(timeElapsed) {
    this.movement(timeElapsed);
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

},{}],11:[function(require,module,exports){
const Bullet = require('./bullet.js');
const Event = require('./event.js');
const Enemy = require('./enemy.js');
const components = require('./components/index.js');
const gameArea = require('./gameArea.js');
const PowerUp = require('./powerUp.js');

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

    components.player.update(timeElapsed, gameArea.canvasElement, keyMap);
    components.bullets.update(timeElapsed, 0, components, Bullet, keyMap);
    components.enemies.update(timeElapsed, 0, 1366, components, Enemy);
    components.powerUps.update(timeElapsed, components, PowerUp);
    canvasFill(components, gameArea);
    window.requestAnimationFrame(requestAnimationFrameLoop);
  }
  requestAnimationFrameLoop(timeElapsed, timePrevious);
}

window.onload = () => {
  gameArea.start(components);
  update(components, gameArea);
  Event.mouseMove(gameArea.canvasElement, components.player);
  Event.click(gameArea.canvasElement, Bullet, components, components.player);
  Event.keyInput(gameArea.canvasElement, components, Bullet, keyMap);
};

},{"./bullet.js":1,"./components/index.js":4,"./enemy.js":6,"./event.js":7,"./gameArea.js":8,"./powerUp.js":10}]},{},[11]);
