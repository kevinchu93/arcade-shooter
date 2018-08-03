const sinon = require('sinon');
const { expect } = require('chai');
const DefaultBullet = require('../src/objects/bullet/default.js');
const ClientEngine = require('../src/clientEngine.js');
const Player = require('../src/objects/player/index.js');


describe('DefaultBullet', () => {
  let mockClientEngine = null;
  let mockPlayer = null;
  let mockDefaultBullet = null;
  beforeEach(() => {
    mockClientEngine = new ClientEngine();
    mockClientEngine.canvas = {
      width: 1366,
      height: 768,
    };
    mockPlayer = new Player(mockClientEngine, 'id');
    mockDefaultBullet = new DefaultBullet(mockClientEngine, mockPlayer);
  });
  describe('constructor', () => {
    it('should create new DefaultBullet instance', () => {
      expect(mockDefaultBullet).to.be.an.instanceof(DefaultBullet);
    });
  });
  describe('movement', () => {
    it('should update positionY using time input', () => {
      mockDefaultBullet.speed = 20;
      mockDefaultBullet.positionY = 1000;
      mockDefaultBullet.movement(100);
      expect(mockDefaultBullet.positionY).to.equal(880);
    });
  });
  describe('boundaryCheck', () => {
    it('should set removeFromGame = true when positionVertical + height are below 0', () => {
      mockDefaultBullet.positionY = -100;
      mockDefaultBullet.height = 20;
      mockDefaultBullet.removeFromGame = false;
      mockDefaultBullet.boundaryCheck();
      expect(mockDefaultBullet.removeFromGame).to.equal(true);
    });
    it('should not set removeFromGame = true when positionVertical + height are not below 0', () => {
      mockDefaultBullet.positionY = 100;
      mockDefaultBullet.height = 20;
      mockDefaultBullet.removeFromGame = false;
      mockDefaultBullet.boundaryCheck();
      expect(mockDefaultBullet.removeFromGame).to.equal(false);
    });
  });
  describe('update', () => {
    it('should call boundaryCheck, movement, hitCheck', () => {
      sinon.stub(mockDefaultBullet, 'boundaryCheck');
      sinon.stub(mockDefaultBullet, 'movement');
      sinon.stub(mockDefaultBullet, 'hitCheck');
      mockDefaultBullet.update('time');
      sinon.assert.calledWithExactly(mockDefaultBullet.boundaryCheck);
      sinon.assert.calledWithExactly(mockDefaultBullet.movement, 'time');
      sinon.assert.calledWithExactly(mockDefaultBullet.hitCheck);
      mockDefaultBullet.movement.restore();
      mockDefaultBullet.boundaryCheck.restore();
      mockDefaultBullet.hitCheck.restore();
    });
  });
  describe('draw', () => {
    it('should set fillStyle', () => {
      mockDefaultBullet.game.canvasContext = { fillStyle: null, fillRect() {} };
      mockDefaultBullet.type = 'type';
      sinon.stub(mockDefaultBullet.game.canvasContext, 'fillRect');
      mockDefaultBullet.draw();
      expect(mockDefaultBullet.game.canvasContext.fillStyle).to.equal('type');
      mockDefaultBullet.game.canvasContext.fillRect.restore();
    });
    it('should call fillRect', () => {
      mockDefaultBullet.game.canvasContext = { fillStyle: null, fillRect() {} };
      mockDefaultBullet.positionX = 'positionX';
      mockDefaultBullet.positionY = 'positionY';
      mockDefaultBullet.width = 'width';
      mockDefaultBullet.height = 'height';
      sinon.stub(mockDefaultBullet.game.canvasContext, 'fillRect');
      mockDefaultBullet.draw();
      sinon.assert.calledWithExactly(
        mockDefaultBullet.game.canvasContext.fillRect,
        'positionX',
        'positionY',
        'width',
        'height',
      );
      mockDefaultBullet.game.canvasContext.fillRect.restore();
    });
  });
  describe('hitCheck', () => {
    it('should call rectangleCollision when enemy.removeFromGame === false', () => {
      mockDefaultBullet.positionX = 'positionX';
      mockDefaultBullet.positionY = 'positionY';
      mockDefaultBullet.width = 'width';
      mockDefaultBullet.height = 'height';
      mockDefaultBullet.game.enemies.entities = [{
        removeFromGame: false,
        positionX: 'enemyPositionX',
        positionY: 'enemyPositionY',
        width: 'enemyWidth',
        height: 'enemyHeight',
      }];
      sinon.stub(mockDefaultBullet.constructor, 'rectangleCollision');
      mockDefaultBullet.hitCheck();
      sinon.assert.calledWithExactly(
        mockDefaultBullet.constructor.rectangleCollision,
        'positionX',
        'positionXwidth',
        'positionY',
        'positionYheight',
        'enemyPositionX',
        'enemyPositionXenemyWidth',
        'enemyPositionY',
        'enemyPositionYenemyHeight',
      );
      mockDefaultBullet.constructor.rectangleCollision.restore();
    });
    it('should not call rectangleCollision when enemy.removeFromGame === true', () => {
      mockDefaultBullet.positionX = 'positionX';
      mockDefaultBullet.positionY = 'positionY';
      mockDefaultBullet.width = 'width';
      mockDefaultBullet.height = 'height';
      mockDefaultBullet.game.enemies.entities = [{
        removeFromGame: true,
        positionX: 'enemyPositionX',
        positionY: 'enemyPositionY',
        width: 'enemyWidth',
        height: 'enemyHeight',
      }];
      sinon.stub(mockDefaultBullet.constructor, 'rectangleCollision');
      mockDefaultBullet.hitCheck();
      sinon.assert.notCalled(mockDefaultBullet.constructor.rectangleCollision);
      mockDefaultBullet.constructor.rectangleCollision.restore();
    });
    it('should set enemy.removeFromGame and mockDefaultBullet.removeFromGame = true if rectangleCollision returns true', () => {
      mockDefaultBullet.removeFromGame = false;
      mockDefaultBullet.playerId = 'id';
      mockDefaultBullet.game.players.entities = { id: { score: 0 } };
      mockDefaultBullet.positionX = 'positionX';
      mockDefaultBullet.positionY = 'positionY';
      mockDefaultBullet.width = 'width';
      mockDefaultBullet.height = 'height';
      mockDefaultBullet.game.enemies.entities = [{
        removeFromGame: false,
        positionX: 'enemyPositionX',
        positionY: 'enemyPositionY',
        width: 'enemyWidth',
        height: 'enemyHeight',
      }];
      sinon.stub(mockDefaultBullet.constructor, 'rectangleCollision').returns(true);
      mockDefaultBullet.hitCheck();
      expect(mockDefaultBullet.game.enemies.entities[0].removeFromGame).to.equal(true);
      expect(mockDefaultBullet.removeFromGame).to.equal(true);
      mockDefaultBullet.constructor.rectangleCollision.restore();
    });
    it('should increase score by 1 if rectangleCollision returns true', () => {
      mockDefaultBullet.removeFromGame = false;
      mockDefaultBullet.playerId = 'id';
      mockDefaultBullet.game.players.entities = { id: { score: 0 } };
      mockDefaultBullet.positionX = 'positionX';
      mockDefaultBullet.positionY = 'positionY';
      mockDefaultBullet.width = 'width';
      mockDefaultBullet.height = 'height';
      mockDefaultBullet.game.enemies.entities = [{
        removeFromGame: false,
        positionX: 'enemyPositionX',
        positionY: 'enemyPositionY',
        width: 'enemyWidth',
        height: 'enemyHeight',
      }];
      sinon.stub(mockDefaultBullet.constructor, 'rectangleCollision').returns(true);
      mockDefaultBullet.hitCheck();
      expect(mockDefaultBullet.game.players.entities.id.score).to.equal(1);
      mockDefaultBullet.constructor.rectangleCollision.restore();
    });
    it('should not set enemy.removeFromGame and mockDefaultBullet.removeFromGame = true if rectangleCollision returns false', () => {
      mockDefaultBullet.removeFromGame = false;
      mockDefaultBullet.playerId = 'id';
      mockDefaultBullet.game.players.entities = { id: { score: 0 } };
      mockDefaultBullet.positionX = 'positionX';
      mockDefaultBullet.positionY = 'positionY';
      mockDefaultBullet.width = 'width';
      mockDefaultBullet.height = 'height';
      mockDefaultBullet.game.enemies.entities = [{
        removeFromGame: false,
        positionX: 'enemyPositionX',
        positionY: 'enemyPositionY',
        width: 'enemyWidth',
        height: 'enemyHeight',
      }];
      sinon.stub(mockDefaultBullet.constructor, 'rectangleCollision').returns(false);
      mockDefaultBullet.hitCheck();
      expect(mockDefaultBullet.game.enemies.entities[0].removeFromGame).to.equal(false);
      expect(mockDefaultBullet.removeFromGame).to.equal(false);
      mockDefaultBullet.constructor.rectangleCollision.restore();
    });
    it('should not increase score by 1 if rectangleCollision returns true', () => {
      mockDefaultBullet.removeFromGame = false;
      mockDefaultBullet.playerId = 'id';
      mockDefaultBullet.game.players.entities = { id: { score: 0 } };
      mockDefaultBullet.positionX = 'positionX';
      mockDefaultBullet.positionY = 'positionY';
      mockDefaultBullet.width = 'width';
      mockDefaultBullet.height = 'height';
      mockDefaultBullet.game.enemies.entities = [{
        removeFromGame: false,
        positionX: 'enemyPositionX',
        positionY: 'enemyPositionY',
        width: 'enemyWidth',
        height: 'enemyHeight',
      }];
      sinon.stub(mockDefaultBullet.constructor, 'rectangleCollision').returns(false);
      mockDefaultBullet.hitCheck();
      expect(mockDefaultBullet.game.players.entities.id.score).to.equal(0);
      mockDefaultBullet.constructor.rectangleCollision.restore();
    });
  });
  describe('rectangleCollision', () => {
    it('should return true if coordinates of A and B overlap', () => {
      const A = [0, 2, 0, 2];
      const B = [1, 3, 1, 3];
      expect(DefaultBullet.rectangleCollision(
        A[0], A[1], A[2], A[3],
        B[0], B[1], B[2], B[3],
      )).to.equal(true);
    });
    it('should return false if coordinates of A and B do not overlap', () => {
      const A = [0, 2, 0, 2];
      const B = [3, 5, 3, 5];
      expect(DefaultBullet.rectangleCollision(
        A[0], A[1], A[2], A[3],
        B[0], B[1], B[2], B[3],
      )).to.equal(false);
    });
  });
  describe('getState', () => {
    it('should return state', () => {
      mockDefaultBullet.playerId = 'playerId';
      mockDefaultBullet.width = 'width';
      mockDefaultBullet.height = 'height';
      mockDefaultBullet.speed = 'speed';
      mockDefaultBullet.positionX = 'positionX';
      mockDefaultBullet.positionY = 'positionY';
      mockDefaultBullet.type = 'type';
      mockDefaultBullet.removeFromGame = 'removeFromGame';
      expect(mockDefaultBullet.getState()).to.deep.equal({
        playerId: 'playerId',
        width: 'width',
        height: 'height',
        speed: 'speed',
        positionX: 'positionX',
        positionY: 'positionY',
        type: 'type',
        removeFromGame: 'removeFromGame',
      });
    });
  });
});
