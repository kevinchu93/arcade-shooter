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
    if (this.hitCheck(components.enemy)) {
      components.bulletHead = Bullet.remove(components.bulletHead, this);
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
  hitCheck(enemy) {
    return (
      this.positionVertical <= enemy.positionVertical + enemy.height &&
      this.positionVertical >= enemy.positionVertical &&
      this.positionHorizontal >= enemy.positionHorizontal &&
      this.positionHorizontal <= enemy.positionHorizontal + enemy.width
    )
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
  static append(head, value) {
    if (head == null) {
      head = value;
      return head;
    }
    for (let i = head; i != null; i = i.next) {
      if (i.next == null) {
        i.next = value;
        i = i.next;
      }
    }
    return head;
  }
  static remove(head, value) {
    if (head == value) {
      return head.next;
    }
    for (let i = head; i.next != null; i = i.next) {
      if (i.next == value) {
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
  update(timeElapsed, boundaryLeft, boundaryRight) {
    this.boundaryCheck(boundaryLeft, boundaryRight);
    this.movement(timeElapsed);
  }
  static getDefaultSpec() {
    return {
      width: 50,
      height: 30,
      positionHorizontal: 350,
      positionVertical: 75, // canvas height - height
      speed: 20,
    };
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
      components.bulletHead = Bullet.append(components.bulletHead, bullet);
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
  static getDefaultSpec() {
    return {
      width: 35,
      height: 20,
      positionHorizontal: 100,
      positionVertical: 768 - 20, // canvas height - height
      score: 0,
    };
  }
};

},{}],5:[function(require,module,exports){
const Bullet = require('./bullet.js');
const Player = require('./player.js');
const Event = require('./event.js');
const Enemy = require('./enemy.js');

const head = {
  value: null,
};

const components = {
  bulletHead: null,
  player: new Player(Player.getDefaultSpec()),
  enemy: new Enemy(Enemy.getDefaultSpec()),
};

const gameArea = {
  canvasElement: document.getElementById('canvas'),
  start: function () {
    this.canvasElement.width = 1366;
    this.canvasElement.height = 768;
    this.canvasElementDrawingContext = this.canvasElement.getContext('2d');
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
};

function canvasFill(components) {
  gameArea.fill();
  components.player.canvasFill(gameArea.canvasElementDrawingContext);
  components.enemy.canvasFill(gameArea.canvasElementDrawingContext);
  for (let i = components.bulletHead; i != null; i = i.next) {
    i.canvasFill(gameArea.canvasElementDrawingContext);
  }
}

function update(components, gameArea) {
  let timeElapsed;
  let timePrevious = 0;

  function requestAnimationFrameLoop(timeStamp) {
    timeStamp = timeStamp || 20;    // timeStamp is undefined until window.requestAnimationFrame runs
    timeElapsed = timeStamp - timePrevious;
    timePrevious = timeStamp;
    for (let i = components.bulletHead; i != null; i = i.next) {
      i.update(timeElapsed, 0, components, Bullet);
    }

    components.enemy.update(timeElapsed, 0, 1366);
    canvasFill(components);
    window.requestAnimationFrame(requestAnimationFrameLoop);
  }
  requestAnimationFrameLoop(timeElapsed, timePrevious);
}

window.onload = () => {
  gameArea.start();
  update(components, gameArea);
  Event.mouseMove(gameArea.canvasElement, components.player);
  Event.click(gameArea.canvasElement, Bullet, components, components.player);
};

},{"./bullet.js":1,"./enemy.js":2,"./event.js":3,"./player.js":4}]},{},[5]);
