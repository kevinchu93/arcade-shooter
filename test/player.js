const sinon = require('sinon');
const { expect } = require('chai');
const Player = require('../src/objects/player/index.js');
const ClientEngine = require('../src/clientEngine.js');

describe('Player', () => {
  let mockClientEngine = null;
  let mockPlayer = null;
  beforeEach(() => {
    mockClientEngine = new ClientEngine();
    mockClientEngine.canvas = {
      width: 1366,
      height: 768,
    };
    mockPlayer = new Player(mockClientEngine, 'id');
  });
  describe('constructor', () => {
    it('should create Player instance', () => {
      expect(mockPlayer).to.be.an.instanceof(Player);
    });
  });
  describe('draw', () => {
    it('should call fillRect and fillText', () => {
      mockPlayer.game.canvasContext = { fillRect() {}, fillText() {} };
      mockPlayer.positionX = 'positionX';
      mockPlayer.positionY = 'positionY';
      mockPlayer.width = 'width';
      mockPlayer.height = 'height';
      mockPlayer.score = 'score';
      sinon.stub(mockPlayer.game.canvasContext, 'fillRect');
      sinon.stub(mockPlayer.game.canvasContext, 'fillText');
      mockPlayer.draw();
      sinon.assert.calledWithExactly(
        mockPlayer.game.canvasContext.fillRect,
        'positionX',
        'positionY',
        'width',
        'height',
      );
      sinon.assert.calledWithExactly(mockPlayer.game.canvasContext.fillText, 'score', 1200, 55);
      mockPlayer.game.canvasContext.fillRect.restore();
      mockPlayer.game.canvasContext.fillText.restore();
    });
  });
  describe('getState', () => {
    it('should return state', () => {
      mockPlayer.width = 'width';
      mockPlayer.height = 'height';
      mockPlayer.speed = 'speed';
      mockPlayer.positionX = 'positionX';
      mockPlayer.positionY = 'positionY';
      mockPlayer.speedXInitial = 'speedXInitial';
      mockPlayer.speedYInitial = 'speedYInitial';
      mockPlayer.speedXFinal = 'speedXFinal';
      mockPlayer.speedYFinal = 'speedYFinal';
      mockPlayer.maxSpeed = 'maxSpeed';
      mockPlayer.accelerationX = 'accelerationX';
      mockPlayer.accelerationY = 'accelerationY';
      mockPlayer.acceleration = 'acceleration';
      mockPlayer.friction = 'friction';
      mockPlayer.bulletType = 'bulletType';
      mockPlayer.bulletLevel = 'bulletLevel';
      mockPlayer.maxBulletLevel = 'maxBulletLevel';
      mockPlayer.score = 'score';
      mockPlayer.socketId = 'socketid';
      mockPlayer.keyMap = 'keyMap';
      mockPlayer.inputSequence = 'inputSequence';
      expect(mockPlayer.getState()).to.deep.equal({
        width: 'width',
        height: 'height',
        speed: 'speed',
        positionX: 'positionX',
        positionY: 'positionY',
        speedXInitial: 'speedXInitial',
        speedYInitial: 'speedYInitial',
        speedXFinal: 'speedXFinal',
        speedYFinal: 'speedYFinal',
        maxSpeed: 'maxSpeed',
        accelerationX: 'accelerationX',
        accelerationY: 'accelerationY',
        acceleration: 'acceleration',
        friction: 'friction',
        bulletType: 'bulletType',
        bulletLevel: 'bulletLevel',
        maxBulletLevel: 'maxBulletLevel',
        score: 'score',
        socketId: 'socketid',
        keyMap: 'keyMap',
        inputSequence: 'inputSequence',
      });
    });
  });
  describe('update', () => {
    beforeEach(() => {
      sinon.stub(mockPlayer, 'movement');
      sinon.stub(mockPlayer, 'powerUpCollisionCheck');
      sinon.stub(mockPlayer.game.bullets, 'create');
    });
    afterEach(() => {
      mockPlayer.movement.restore();
      mockPlayer.powerUpCollisionCheck.restore();
      mockPlayer.game.bullets.create();
    });
    it('should call movement and powerUpCollisionCheck', () => {
      mockPlayer.update('input', 'time');
      sinon.assert.calledWithExactly(mockPlayer.movement, 'input', 'time');
      sinon.assert.calledWithExactly(mockPlayer.powerUpCollisionCheck);
    });
    it('should call game.bullets.create when input[13] === true', () => {
      const input = [];
      input[13] = true;
      mockPlayer.update(input, 'time');
      sinon.assert.calledWithExactly(mockPlayer.game.bullets.create, mockPlayer);
    });
    it('should not call game.bullets.create when input[13] !== true', () => {
      const input = [];
      input[13] = false;
      mockPlayer.update(input, 'time');
      sinon.assert.notCalled(mockPlayer.game.bullets.create);
    });
  });
  describe('movement', () => {
    it('should call positionXUpdate, positionYUpdate, speedXUpdate, speedYUpdate, accelerateXUpdate, accelerateYUpdate', () => {
      sinon.stub(mockPlayer, 'positionXUpdate');
      sinon.stub(mockPlayer, 'positionYUpdate');
      sinon.stub(mockPlayer, 'speedXUpdate');
      sinon.stub(mockPlayer, 'speedYUpdate');
      sinon.stub(mockPlayer, 'accelerateXUpdate');
      sinon.stub(mockPlayer, 'accelerateYUpdate');
      mockPlayer.movement('input', 'time');
      sinon.assert.calledWithExactly(mockPlayer.positionXUpdate, 'time');
      sinon.assert.calledWithExactly(mockPlayer.positionYUpdate, 'time');
      sinon.assert.calledWithExactly(mockPlayer.speedXUpdate, 'time');
      sinon.assert.calledWithExactly(mockPlayer.speedYUpdate, 'time');
      sinon.assert.calledWithExactly(mockPlayer.accelerateXUpdate, 'input');
      sinon.assert.calledWithExactly(mockPlayer.accelerateYUpdate, 'input');
      mockPlayer.positionXUpdate.restore();
      mockPlayer.positionYUpdate.restore();
      mockPlayer.speedXUpdate.restore();
      mockPlayer.speedYUpdate.restore();
      mockPlayer.accelerateXUpdate.restore();
      mockPlayer.accelerateYUpdate.restore();
    });
  });
  describe('positionXUpdate', () => {
    it('should set positionX using time input', () => {
      mockPlayer.positionX = 100;
      mockPlayer.speedXInitial = 0;
      mockPlayer.speedXFinal = 10;
      mockPlayer.positionXUpdate(100);
      expect(mockPlayer.positionX).to.equal(130);
    });
    it('should set positionX = 0 if positionX < 0 after time input', () => {
      mockPlayer.positionX = -100;
      mockPlayer.speedXInitial = 0;
      mockPlayer.speedXFinal = 10;
      mockPlayer.positionXUpdate(0);
      expect(mockPlayer.positionX).to.equal(0);
    });
    it('should set positionX = canvas.width - width  if positionX + width > canvas.width after time input', () => {
      mockPlayer.game.canvas.width = 100;
      mockPlayer.width = 10;
      mockPlayer.positionX = 100;
      mockPlayer.speedXInitial = 0;
      mockPlayer.speedXFinal = 10;
      mockPlayer.positionXUpdate(0);
      expect(mockPlayer.positionX).to.equal(90);
    });
  });
  describe('positionYUpdate', () => {
    it('should set positionY using time input', () => {
      mockPlayer.positionY = 100;
      mockPlayer.speedYInitial = 0;
      mockPlayer.speedYFinal = 10;
      mockPlayer.positionYUpdate(100);
      expect(mockPlayer.positionY).to.equal(130);
    });
    it('should set positionY = 0 if positionY < 0 after time input', () => {
      mockPlayer.positionY = -100;
      mockPlayer.speedYInitial = 0;
      mockPlayer.speedYFinal = 10;
      mockPlayer.positionYUpdate(0);
      expect(mockPlayer.positionY).to.equal(0);
    });
    it('should set positionY = canvas.width - width  if positionY + width > canvas.width after time input', () => {
      mockPlayer.game.canvas.height = 100;
      mockPlayer.height = 10;
      mockPlayer.positionY = 100;
      mockPlayer.speedYInitial = 0;
      mockPlayer.speedYFinal = 10;
      mockPlayer.positionYUpdate(0);
      expect(mockPlayer.positionY).to.equal(90);
    });
  });
  describe('speedXUpdate', () => {
    it('should set speedXInitial = speedXFinal', () => {
      mockPlayer.speedXInitial = 0;
      mockPlayer.speedXFinal = 10;
      mockPlayer.speedXUpdate(0);
      expect(mockPlayer.speedXInitial).to.equal(10);
    });
    it('should decrease speedXFinal using friction and time if speedXFinal > 0', () => {
      mockPlayer.speedXInitial = 0;
      mockPlayer.speedXFinal = 10;
      mockPlayer.friction = 0.3;
      mockPlayer.maxSpeed = 1000;
      mockPlayer.speedXUpdate(100);
      expect(mockPlayer.speedXFinal).to.equal(8.2);
    });
    it('should not decrease speedXFinal to < 0 as a result of friction and time', () => {
      mockPlayer.speedXInitial = 0;
      mockPlayer.speedXFinal = 10;
      mockPlayer.friction = 30;
      mockPlayer.maxSpeed = 1000;
      mockPlayer.speedXUpdate(100);
      expect(mockPlayer.speedXFinal).to.equal(0);
    });
    it('should increase speedXFinal using friction and time if speedXFinal < 0', () => {
      mockPlayer.speedXInitial = 0;
      mockPlayer.speedXFinal = -10;
      mockPlayer.friction = 0.3;
      mockPlayer.maxSpeed = 1000;
      mockPlayer.speedXUpdate(100);
      expect(mockPlayer.speedXFinal).to.equal(-8.2);
    });
    it('should not increase speedXFinal to > 0 as a result of friction and time', () => {
      mockPlayer.speedXInitial = 0;
      mockPlayer.speedXFinal = -10;
      mockPlayer.friction = 30;
      mockPlayer.maxSpeed = 1000;
      mockPlayer.speedXUpdate(100);
      expect(mockPlayer.speedXFinal).to.equal(0);
    });
    it('should set speedXFinal to -maxSpeed if speedXfinal < -maxSpeed', () => {
      mockPlayer.speedXInitial = 0;
      mockPlayer.speedXFinal = -10;
      mockPlayer.friction = 0;
      mockPlayer.maxSpeed = 1;
      mockPlayer.speedXUpdate(0);
      expect(mockPlayer.speedXFinal).to.equal(-1);
    });
    it('should set speedXFinal to maxSpeed if speedXfinal > -maxSpeed', () => {
      mockPlayer.speedXInitial = 0;
      mockPlayer.speedXFinal = 10;
      mockPlayer.friction = 0;
      mockPlayer.maxSpeed = 1;
      mockPlayer.speedXUpdate(0);
      expect(mockPlayer.speedXFinal).to.equal(1);
    });
  });
  describe('speedYUpdate', () => {
    it('should set speedYInitial = speedYFinal', () => {
      mockPlayer.speedYInitial = 0;
      mockPlayer.speedYFinal = 10;
      mockPlayer.speedYUpdate(0);
      expect(mockPlayer.speedYInitial).to.equal(10);
    });
    it('should decrease speedYFinal using friction and time if speedYFinal > 0', () => {
      mockPlayer.speedYInitial = 0;
      mockPlayer.speedYFinal = 10;
      mockPlayer.friction = 0.3;
      mockPlayer.maxSpeed = 1000;
      mockPlayer.speedYUpdate(100);
      expect(mockPlayer.speedYFinal).to.equal(8.2);
    });
    it('should not decrease speedYFinal to < 0 as a result of friction and time', () => {
      mockPlayer.speedYInitial = 0;
      mockPlayer.speedYFinal = 10;
      mockPlayer.friction = 30;
      mockPlayer.maxSpeed = 1000;
      mockPlayer.speedYUpdate(100);
      expect(mockPlayer.speedYFinal).to.equal(0);
    });
    it('should increase speedYFinal using friction and time if speedYFinal < 0', () => {
      mockPlayer.speedYInitial = 0;
      mockPlayer.speedYFinal = -10;
      mockPlayer.friction = 0.3;
      mockPlayer.maxSpeed = 1000;
      mockPlayer.speedYUpdate(100);
      expect(mockPlayer.speedYFinal).to.equal(-8.2);
    });
    it('should not increase speedYFinal to > 0 as a result of friction and time', () => {
      mockPlayer.speedYInitial = 0;
      mockPlayer.speedYFinal = -10;
      mockPlayer.friction = 30;
      mockPlayer.maxSpeed = 1000;
      mockPlayer.speedYUpdate(100);
      expect(mockPlayer.speedYFinal).to.equal(0);
    });
    it('should set speedYFinal to -maxSpeed if speedYfinal < -maxSpeed', () => {
      mockPlayer.speedYInitial = 0;
      mockPlayer.speedYFinal = -10;
      mockPlayer.friction = 0;
      mockPlayer.maxSpeed = 1;
      mockPlayer.speedYUpdate(0);
      expect(mockPlayer.speedYFinal).to.equal(-1);
    });
    it('should set speedYFinal to maxSpeed if speedYfinal > -maxSpeed', () => {
      mockPlayer.speedYInitial = 0;
      mockPlayer.speedYFinal = 10;
      mockPlayer.friction = 0;
      mockPlayer.maxSpeed = 1;
      mockPlayer.speedYUpdate(0);
      expect(mockPlayer.speedYFinal).to.equal(1);
    });
  });
  describe('accelerateXUpdate', () => {
    it('should set accelerationX = -acceleration if input[37] === true and input[39] !== true', () => {
      const input = [];
      input[37] = true;
      input[39] = false;
      mockPlayer.accelerationX = 1;
      mockPlayer.acceleration = 10;
      mockPlayer.accelerateXUpdate(input);
      expect(mockPlayer.accelerationX).to.equal(-10);
    });
    it('should set accelerationX = acceleration if input[37] !== true and input[39] === true', () => {
      const input = [];
      input[37] = false;
      input[39] = true;
      mockPlayer.accelerationX = 1;
      mockPlayer.acceleration = 10;
      mockPlayer.accelerateXUpdate(input);
      expect(mockPlayer.accelerationX).to.equal(10);
    });
    it('should set accelerationX = 0 if input[37] !== true and input[39] !== true', () => {
      const input = [];
      input[37] = false;
      input[39] = false;
      mockPlayer.accelerationX = 1;
      mockPlayer.acceleration = 10;
      mockPlayer.accelerateXUpdate(input);
      expect(mockPlayer.accelerationX).to.equal(0);
    });
    it('should set accelerationX = 0 if input[37] === true and input[39] === true', () => {
      const input = [];
      input[37] = true;
      input[39] = true;
      mockPlayer.accelerationX = 1;
      mockPlayer.acceleration = 10;
      mockPlayer.accelerateXUpdate(input);
      expect(mockPlayer.accelerationX).to.equal(0);
    });
  });
  describe('accelerateYUpdate', () => {
    it('should set accelerationY = -acceleration if input[38] === true and input[40] !== true', () => {
      const input = [];
      input[38] = true;
      input[40] = false;
      mockPlayer.accelerationY = 1;
      mockPlayer.acceleration = 10;
      mockPlayer.accelerateYUpdate(input);
      expect(mockPlayer.accelerationY).to.equal(-10);
    });
    it('should set accelerationY = acceleration if input[38] !== true and input[40] === true', () => {
      const input = [];
      input[38] = false;
      input[40] = true;
      mockPlayer.accelerationY = 1;
      mockPlayer.acceleration = 10;
      mockPlayer.accelerateYUpdate(input);
      expect(mockPlayer.accelerationY).to.equal(10);
    });
    it('should set accelerationY = 0 if input[38] !== true and input[40] !== true', () => {
      const input = [];
      input[38] = false;
      input[40] = false;
      mockPlayer.accelerationY = 1;
      mockPlayer.acceleration = 10;
      mockPlayer.accelerateYUpdate(input);
      expect(mockPlayer.accelerationY).to.equal(0);
    });
    it('should set accelerationY = 0 if input[38] === true and input[40] === true', () => {
      const input = [];
      input[38] = true;
      input[40] = true;
      mockPlayer.accelerationY = 1;
      mockPlayer.acceleration = 10;
      mockPlayer.accelerateYUpdate(input);
      expect(mockPlayer.accelerationY).to.equal(0);
    });
  });
  describe('powerUpCollisionCheck', () => {
    it('should increase bulletLevel if powerUp within player position, bulletType === powerUp.color and bulletLevel < maxBulletLevel', () => {
      const powerUp = {
        removeFromGame: false,
        positionX: 10,
        positionY: 10,
        color: 'color',
      };
      mockPlayer.game.powerUps.entities = [];
      mockPlayer.game.powerUps.entities[0] = powerUp;
      mockPlayer.positionX = 5;
      mockPlayer.positionY = 5;
      mockPlayer.width = 10;
      mockPlayer.height = 10;
      mockPlayer.bulletType = 'color';
      mockPlayer.bulletLevel = 2;
      mockPlayer.maxBulletLevel = 5;
      mockPlayer.powerUpCollisionCheck();
      expect(mockPlayer.bulletLevel).to.equal(3);
    });
    it('should set bulletType = powerUp.color if powerUp within player position, bulletType !== powerUp.color', () => {
      const powerUp = {
        removeFromGame: false,
        positionX: 10,
        positionY: 10,
        color: 'color',
      };
      mockPlayer.game.powerUps.entities = [];
      mockPlayer.game.powerUps.entities[0] = powerUp;
      mockPlayer.positionX = 5;
      mockPlayer.positionY = 5;
      mockPlayer.width = 10;
      mockPlayer.height = 10;
      mockPlayer.bulletType = 'type';
      mockPlayer.bulletLevel = 2;
      mockPlayer.maxBulletLevel = 5;
      mockPlayer.powerUpCollisionCheck();
      expect(mockPlayer.bulletType).to.equal('color');
    });
    it('should set bulletLevel = 1 if powerUp within player position, bulletType !== powerUp.color', () => {
      const powerUp = {
        removeFromGame: false,
        positionX: 10,
        positionY: 10,
        color: 'color',
      };
      mockPlayer.game.powerUps.entities = [];
      mockPlayer.game.powerUps.entities[0] = powerUp;
      mockPlayer.positionX = 5;
      mockPlayer.positionY = 5;
      mockPlayer.width = 10;
      mockPlayer.height = 10;
      mockPlayer.bulletType = 'type';
      mockPlayer.bulletLevel = 2;
      mockPlayer.maxBulletLevel = 5;
      mockPlayer.powerUpCollisionCheck();
      expect(mockPlayer.bulletLevel).to.equal(1);
    });
    it('should not change bulletLevel or bulletType if powerUp not within player position', () => {
      const powerUp = {
        removeFromGame: false,
        positionX: 20,
        positionY: 20,
        color: 'color',
      };
      mockPlayer.game.powerUps.entities = [];
      mockPlayer.game.powerUps.entities[0] = powerUp;
      mockPlayer.positionX = 5;
      mockPlayer.positionY = 5;
      mockPlayer.width = 10;
      mockPlayer.height = 10;
      mockPlayer.bulletType = 'type';
      mockPlayer.bulletLevel = 2;
      mockPlayer.maxBulletLevel = 5;
      mockPlayer.powerUpCollisionCheck();
      expect(mockPlayer.bulletLevel).to.equal(2);
      expect(mockPlayer.bulletType).to.equal('type');
    });
  });
});
