(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = class bullet {
  constructor(obj) {
    this.width = obj.width;
    this.height = obj.height;
    this.speed = obj.speed;
    this.positionHorizontal = obj.positionHorizontal;
    this.positionVertical = obj.positionVertical;
    this.state = obj.state;
    this.nextBullet = null;
  }
  static getDefaultSpec() {
    return {
      width: 5,
      height: 10,
      speed: 20,
      positionHorizontal: undefined,
      positionVertical: undefined,   // canvas height - height
      state: true,
      nextBullet: null,
    };
  }
  movement(time) {
    if (this.state) {
      this.positionVertical -= this.speed * (time / (1000 / 60));
    }
  }

  boundaryCheck(boundary) {
    if (this.positionVertical + this.height <= boundary) {
      this.state = false;
    }
  }

  update(timeElapsed, boundary, components, Bullet) {
    this.boundaryCheck(boundary);
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
    for (let i = enemyHead; i != null; i = i.next) {
      if (
        this.positionVertical <= i.positionVertical + i.height &&
        this.positionVertical >= i.positionVertical &&
        this.positionHorizontal >= i.positionHorizontal &&
        this.positionHorizontal <= i.positionHorizontal + i.width
      ) {
        i.hitState = true;
        return true;
      }
    }
  }
  append(head) {
    if (head == null) {
      head = this;
      return head;
    }
    for (let i = head; i != null; i = i.next) {
      if (i.next == null) {
        i.next = this;
        i = i.next;
      }
    }
    return head;
  }
  remove(head) {
    if (head == this) {
      return head.next;
    }
    for (let i = head; i.next != null; i = i.next) {
      if (i.next == this) {
        i.next = i.next.next;
      }
      if (i.next == null) {
        return head;
      }
    }
    return head;
  }
};

},{}],2:[function(require,module,exports){
module.exports = class {
  constructor(obj) {
    this.width = obj.width;
    this.height = obj.height;
    this.positionHorizontal = obj.positionHorizontal;
    this.positionVertical = obj.positionVertical;
    this.speed = obj.speed;
    this.hitState = obj.hitState;
  }
  static getDefaultSpec() {
    return {
      width: 50,
      height: 30,
      positionHorizontal: 350,
      positionVertical: 75, // canvas height - height
      speed: 20,
      hitState: false,
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
    if (this.positionHorizontal <= boundaryLeft ||
      (this.positionHorizontal + this.width) >= boundaryRight) {
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
      head = this;
      return head;
    }
    for (let i = head; i != null; i = i.next) {
      if (i.next == null) {
        i.next = this;
        i = i.next;
      }
    }
    return head;
  }
  remove(head) {
    if (head == this) {
      return head.next;
    }
    for (let i = head; i.next != null; i = i.next) {
      if (i.next == this) {
        i.next = i.next.next;
      }
      if (i.next == null) {
        return head;
      }
    }
    return head;
  }
};

},{}],3:[function(require,module,exports){
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
};

},{}],4:[function(require,module,exports){
module.exports = class {
  constructor(obj) {
    this.width = obj.width;
    this.height = obj.height;
    this.positionHorizontal = obj.positionHorizontal;
    this.positionVertical = obj.positionVertical;
    this.score = obj.score;
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
  static getDefaultSpec(canvasWidth, canvasHeight) {
    return {
      width: 35,
      height: 20,
      positionHorizontal: (canvasWidth) / 2,
      positionVertical: canvasHeight - 20, // canvas height - height
      score: 0,
    };
  }
};

},{}],5:[function(require,module,exports){
const Bullet = require('./bullet.js');
const Player = require('./player.js');
const Event = require('./event.js');
const Enemy = require('./enemy.js');

const components = {
  bullets: {
    head: null,
    canvasFill: function(gameArea) {
      for (let i = this.head; i != null; i = i.next) {
        i.canvasFill(gameArea.canvasElementDrawingContext);
      }
    },
    update: function(timeElapsed, boundary, components, Bullet) {
      for (let i = this.head; i != null; i = i.next) {
        i.update(timeElapsed, 0, components, Bullet);
      }
    },
  },
  player: null,
  enemies: {
    head: null,
    canvasFill: function(gameArea) {
      for (let i = this.head; i != null; i = i.next) {
        i.canvasFill(gameArea.canvasElementDrawingContext);
      }
    },
    update: function(timeElapsed, boundaryLeft, boundaryRight, components) {
      for (let i = this.head; i != null; i = i.next) {
        i.update(timeElapsed, 0, 1366, components);
      }
    },
  },
};

const gameArea = {
  canvasElement: document.getElementById('canvas'),
  start: function (components) {
    this.canvasElement.width = 1366;
    this.canvasElement.height = 768;
    this.canvasElementDrawingContext = this.canvasElement.getContext('2d');
    components.player = new Player(Player.getDefaultSpec(this.canvasElement.width, this.canvasElement.height));
    let enemy = new Enemy(Enemy.getDefaultSpec());
    components.enemies.head = enemy.append(components.enemies.head);
  },
  fill: function () {
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
};

function canvasFill(components) {
  gameArea.fill();
  components.player.canvasFill(gameArea.canvasElementDrawingContext);
  components.enemies.canvasFill(gameArea);
  components.bullets.canvasFill(gameArea);
}

function update(components, gameArea) {
  let timeElapsed;
  let timePrevious = 0;

  function requestAnimationFrameLoop(timeStamp) {
    timeStamp = timeStamp || 20;    // timeStamp is undefined until window.requestAnimationFrame runs
    timeElapsed = timeStamp - timePrevious;
    timePrevious = timeStamp;

    gameArea.enemySpawnCountdown -= timeElapsed;
    if (gameArea.enemySpawnCountdown <= 0) {
      let enemy = new Enemy(Enemy.getDefaultSpec());
      components.enemies.head = enemy.append(components.enemies.head);
      gameArea.enemySpawnCountdown += 1000;
    }
    components.bullets.update(timeElapsed, 0, components, Bullet);
    components.enemies.update(timeElapsed, 0, 1366, components);
    canvasFill(components);
    window.requestAnimationFrame(requestAnimationFrameLoop);
  }
  requestAnimationFrameLoop(timeElapsed, timePrevious);
}

window.onload = () => {
  gameArea.start(components);
  update(components, gameArea);
  Event.mouseMove(gameArea.canvasElement, components.player);
  Event.click(gameArea.canvasElement, Bullet, components, components.player);
};

},{"./bullet.js":1,"./enemy.js":2,"./event.js":3,"./player.js":4}]},{},[5]);
