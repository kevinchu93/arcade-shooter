const sinon = require('sinon');
const Player = require('../src/objects/player/index.js');
const { expect } = require('chai');

const canvasWidth = 1366;
const canvasHeight = 768;

const mockPlayerSpecs = {
  width: 30,
  height: 20,
  positionX: canvasWidth / 2,
  positionY: canvasHeight - 25,
  speedX: 0,
  speedY: 0,
  maxSpeed: 5,
  accelerationX: 0,
  accelerationY: 0,
  acceleration: 1.2,
  friction: 0.3,
  bulletType: 'white',
  bulletLevel: 0,
  maxBulletLevel: 5,
  score: 0,
};

describe('Player', () => {
  describe('constructor', () => {
    it('should create new player instance with correct parameters', () => {
      const player = new Player(canvasWidth, canvasHeight);
      expect(player).to.deep.equal(mockPlayerSpecs);
    });
  });
  describe('canvasFill', () => {
    it('should call context.fillRect with correct parameters', () => {
      const player = new Player(canvasWidth, canvasHeight);
      const context = {
        fillRect() {},
        fillText() {},
      };
      sinon.stub(context, 'fillRect');
      sinon.stub(context, 'fillText');
      player.canvasFill(context);
      sinon.assert.calledWithExactly(
        context.fillRect,
        mockPlayerSpecs.positionX,
        mockPlayerSpecs.positionY,
        mockPlayerSpecs.width,
        mockPlayerSpecs.height,
      );
      context.fillRect.restore();
      context.fillText.restore();
    });
    it('should call context.fillRect with correct parameters', () => {
      const player = new Player(canvasWidth, canvasHeight);
      const context = {
        fillRect() {},
        fillText() {},
      };
      sinon.stub(context, 'fillRect');
      sinon.stub(context, 'fillText');
      player.canvasFill(context);
      sinon.assert.calledWithExactly(
        context.fillText,
        mockPlayerSpecs.score,
        1200,
        55,
      );
      context.fillRect.restore();
      context.fillText.restore();
    });
  });
  describe('update', () => {
    it('should call movement with correct parameters', () => {
      const player = new Player(canvasWidth, canvasHeight);
      const mockComponents = {
        powerUps: {
          head: 'head',
        },
      };
      sinon.stub(player, 'movement');
      sinon.stub(player, 'powerUpCollisionCheck');
      player.update('time', 'canvas', 'keyMap', mockComponents);
      sinon.assert.calledWithExactly(player.movement, 'keyMap', 'time', 'canvas');
      player.movement.restore();
      player.powerUpCollisionCheck.restore();
    });
    it('should call powerUpCollisionCheck with correct parameters', () => {
      const player = new Player(canvasWidth, canvasHeight);
      const mockComponents = {
        powerUps: {
          head: 'head',
        },
      };
      sinon.stub(player, 'movement');
      sinon.stub(player, 'powerUpCollisionCheck');
      player.update('time', 'canvas', 'keyMap', mockComponents);
      sinon.assert.calledWithExactly(player.powerUpCollisionCheck, 'head');
      player.movement.restore();
      player.powerUpCollisionCheck.restore();
    });
  });
  describe('movement', () => {
    it('should call positionXUpdate, positionYUpdate, speedXUpdate, speedYUpdate, accelerateXUpdate, accelerateYUpdate with correct parameters', () => {
      const player = new Player(canvasWidth, canvasHeight);
      const canvas = {
        width: 'width',
        height: 'height',
      };
      sinon.stub(player, 'positionXUpdate');
      sinon.stub(player, 'positionYUpdate');
      sinon.stub(player, 'speedXUpdate');
      sinon.stub(player, 'speedYUpdate');
      sinon.stub(player, 'accelerateXUpdate');
      sinon.stub(player, 'accelerateYUpdate');
      player.movement('keyMap', 'time', canvas);
      sinon.assert.calledWithExactly(player.positionXUpdate, 'time', 0, 'width');
      sinon.assert.calledWithExactly(player.positionYUpdate, 'time', 0, 'height');
      sinon.assert.calledWithExactly(player.speedXUpdate, 'time');
      sinon.assert.calledWithExactly(player.speedYUpdate, 'time');
      sinon.assert.calledWithExactly(player.accelerateXUpdate, 'keyMap');
      sinon.assert.calledWithExactly(player.accelerateYUpdate, 'keyMap');
      player.positionXUpdate.restore();
      player.positionYUpdate.restore();
      player.speedXUpdate.restore();
      player.speedYUpdate.restore();
      player.accelerateXUpdate.restore();
      player.accelerateYUpdate.restore();
    });
  });
  describe('positionXUpdate', () => {
    it('should update positionX using time input', () => {
      const player = new Player(canvasWidth, canvasHeight);
      player.speedX = 5;
      const time = 100;
      player.positionXUpdate(time, 'boundaryLeft', 'boundaryRight');
      expect(player.positionX)
        .to.equal(mockPlayerSpecs.positionX + (player.speedX * (time / (1000 / 60))));
    });
    it('should set positionX = boundaryLeft when positionX < boundaryLeft', () => {
      const player = new Player(canvasWidth, canvasHeight);
      player.positionX = 100;
      player.speedX = 0;
      const time = 100;
      const boundaryLeft = 10000;
      player.positionXUpdate(time, boundaryLeft, 'boundaryRight');
      expect(player.positionX).to.equal(boundaryLeft);
    });
    it('should set positionX = boundaryRight when positionX + width > boundaryRight', () => {
      const player = new Player(canvasWidth, canvasHeight);
      player.positionX = 100;
      player.width = 10;
      player.speedX = 0;
      const time = 100;
      const boundaryRight = -10000;
      player.positionXUpdate(time, 'boundaryLeft', boundaryRight);
      expect(player.positionX + player.width).to.equal(boundaryRight);
    });
  });
  describe('positionYUpdate', () => {
    it('should update positionY using time input', () => {
      const player = new Player(canvasWidth, canvasHeight);
      player.speedY = 5;
      const time = 100;
      player.positionYUpdate(time, 'boundaryLeft', 'boundaryRight');
      expect(player.positionY)
        .to.equal(mockPlayerSpecs.positionY + (player.speedY * (time / (1000 / 60))));
    });
    it('should set positionY = boundaryUp when positionY < boundaryUp', () => {
      const player = new Player(canvasWidth, canvasHeight);
      player.positionY = 100;
      player.speedY = 0;
      const time = 100;
      const boundaryUp = 10000;
      player.positionYUpdate(time, boundaryUp, 'boundaryDown');
      expect(player.positionY).to.equal(boundaryUp);
    });
    it('should set positionY = boundaryDown when positionY + height > boundaryDown', () => {
      const player = new Player(canvasWidth, canvasHeight);
      player.positionY = 100;
      player.height = 10;
      player.speedY = 0;
      const time = 100;
      const boundaryDown = -10000;
      player.positionYUpdate(time, 'boundaryUp', boundaryDown);
      expect(player.positionY + player.height).to.equal(boundaryDown);
    });
  });
  describe('speedXUpdate', () => {
    it('should update speedX if within maxSpeed', () => {
      const player = new Player(canvasWidth, canvasHeight);
      player.friction = 0;
      player.speedX = 0;
      player.maxSpeed = 5;
      player.accelerationX = 1;
      const time = 50;
      player.speedXUpdate(time);
      expect(player.speedX).to.equal(3);
    });
    it('should decrement speedX using friction if speed > 0', () => {
      const player = new Player(canvasWidth, canvasHeight);
      player.friction = 1;
      player.speedX = 2;
      player.maxSpeed = 5;
      player.accelerationX = 1;
      const time = 50;
      player.speedXUpdate(time);
      expect(player.speedX).to.equal(2);
    });
    it('should increment speedX using friction if speed < 0', () => {
      const player = new Player(canvasWidth, canvasHeight);
      player.friction = 1;
      player.speedX = -2;
      player.maxSpeed = 5;
      player.accelerationX = -1;
      const time = 50;
      player.speedXUpdate(time);
      expect(player.speedX).to.equal(-2);
    });
    it('should set speedX = maxSpeed if speed exceeds maxSpeed', () => {
      const player = new Player(canvasWidth, canvasHeight);
      player.speedX = 10;
      player.maxSpeed = 5;
      const time = 50;
      player.speedXUpdate(time);
      expect(player.speedX).to.equal(player.maxSpeed);
    });
    it('should set speedX = -maxSpeed if speed exceeds -maxSpeed', () => {
      const player = new Player(canvasWidth, canvasHeight);
      player.speedX = -10;
      player.maxSpeed = 5;
      const time = 50;
      player.speedXUpdate(time);
      expect(player.speedX).to.equal(-player.maxSpeed);
    });
  });
  describe('speedYUpdate', () => {
    it('should update speedY if within maxSpeed', () => {
      const player = new Player(canvasWidth, canvasHeight);
      player.friction = 0;
      player.speedY = 0;
      player.maxSpeed = 5;
      player.accelerationY = 1;
      const time = 50;
      player.speedYUpdate(time);
      expect(player.speedY).to.equal(3);
    });
    it('should decrement speedY using friction if speed > 0', () => {
      const player = new Player(canvasWidth, canvasHeight);
      player.friction = 1;
      player.speedY = 2;
      player.maxSpeed = 5;
      player.accelerationY = 1;
      const time = 50;
      player.speedYUpdate(time);
      expect(player.speedY).to.equal(2);
    });
    it('should increment speedY using friction if speed < 0', () => {
      const player = new Player(canvasWidth, canvasHeight);
      player.friction = 1;
      player.speedY = -2;
      player.maxSpeed = 5;
      player.accelerationY = -1;
      const time = 50;
      player.speedYUpdate(time);
      expect(player.speedY).to.equal(-2);
    });
    it('should set speedY = maxSpeed if speed exceeds maxSpeed', () => {
      const player = new Player(canvasWidth, canvasHeight);
      player.speedY = 10;
      player.maxSpeed = 5;
      const time = 50;
      player.speedYUpdate(time);
      expect(player.speedY).to.equal(player.maxSpeed);
    });
    it('should set speedY = -maxSpeed if speed exceeds -maxSpeed', () => {
      const player = new Player(canvasWidth, canvasHeight);
      player.speedY = -10;
      player.maxSpeed = 5;
      const time = 50;
      player.speedYUpdate(time);
      expect(player.speedY).to.equal(-player.maxSpeed);
    });
  });
  describe('accelerateXUpdate', () => {
    it('should set accelerationX = -acceleration when keyMap[37] === true && keyMap[39] !== true', () => {
      const player = new Player(canvasWidth, canvasHeight);
      const keyMap = [];
      keyMap[37] = true;
      keyMap[39] = false;
      player.accelerateXUpdate(keyMap);
      expect(player.accelerationX).to.equal(-player.acceleration);
    });
    it('should set accelerationX = acceleration when keyMap[37] !== true && keyMap[39] === true', () => {
      const player = new Player(canvasWidth, canvasHeight);
      const keyMap = [];
      keyMap[37] = false;
      keyMap[39] = true;
      player.accelerateXUpdate(keyMap);
      expect(player.accelerationX).to.equal(player.acceleration);
    });
    it('should set accelerationX = 0 when keyMap[37] !== true && keyMap[39] !== true', () => {
      const player = new Player(canvasWidth, canvasHeight);
      const keyMap = [];
      keyMap[37] = false;
      keyMap[39] = false;
      player.accelerateXUpdate(keyMap);
      expect(player.accelerationX).to.equal(0);
    });
    it('should set accelerationX = 0 when keyMap[37] === true && keyMap[39] === true', () => {
      const player = new Player(canvasWidth, canvasHeight);
      const keyMap = [];
      keyMap[37] = true;
      keyMap[39] = true;
      player.accelerateXUpdate(keyMap);
      expect(player.accelerationX).to.equal(0);
    });
  });
  describe('accelerateYUpdate', () => {
    it('should set accelerationY = -acceleration when keyMap[37] === true && keyMap[39] !== true', () => {
      const player = new Player(canvasWidth, canvasHeight);
      const keyMap = [];
      keyMap[38] = true;
      keyMap[40] = false;
      player.accelerateYUpdate(keyMap);
      expect(player.accelerationY).to.equal(-player.acceleration);
    });
    it('should set accelerationY = acceleration when keyMap[37] !== true && keyMap[39] === true', () => {
      const player = new Player(canvasWidth, canvasHeight);
      const keyMap = [];
      keyMap[38] = false;
      keyMap[40] = true;
      player.accelerateYUpdate(keyMap);
      expect(player.accelerationY).to.equal(player.acceleration);
    });
    it('should set accelerationY = 0 when keyMap[37] !== true && keyMap[39] !== true', () => {
      const player = new Player(canvasWidth, canvasHeight);
      const keyMap = [];
      keyMap[38] = false;
      keyMap[40] = false;
      player.accelerateYUpdate(keyMap);
      expect(player.accelerationY).to.equal(0);
    });
    it('should set accelerationY = 0 when keyMap[37] === true && keyMap[39] === true', () => {
      const player = new Player(canvasWidth, canvasHeight);
      const keyMap = [];
      keyMap[38] = true;
      keyMap[40] = true;
      player.accelerateYUpdate(keyMap);
      expect(player.accelerationY).to.equal(0);
    });
  });
  describe('powerUpCollisionCheck', () => {
    it('should increment bulletLevel by 1 if powerUp position within player position, if bulletType = powerUp color and if bulletLevel < maxBulletLevel', () => {
      const player = new Player(canvasWidth, canvasHeight);
      player.positionX = 9;
      player.positionY = 9;
      player.width = 2;
      player.height = 2;
      player.bulletType = 'orangered';
      player.bulletLevel = 1;
      const powerUp = {
        positionX: 10,
        positionY: 10,
        color: 'orangered',
      };
      player.powerUpCollisionCheck(powerUp);
      expect(player.bulletLevel).to.equal(2);
    });
    it('should set bulletType to powerUp color and set bulletLevel to 1 if powerUp position within player position, if bulletType != powerUp color', () => {
      const player = new Player(canvasWidth, canvasHeight);
      player.positionX = 9;
      player.positionY = 9;
      player.width = 2;
      player.height = 2;
      player.bulletType = 'orangered';
      player.bulletLevel = 1;
      const powerUp = {
        positionX: 10,
        positionY: 10,
        color: 'deepskyblue',
      };
      player.powerUpCollisionCheck(powerUp);
      expect(player.bulletType).to.equal('deepskyblue');
      expect(player.bulletLevel).to.equal(1);
    });
  });
});
