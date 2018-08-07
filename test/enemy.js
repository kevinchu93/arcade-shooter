const sinon = require('sinon');
const { expect } = require('chai');
const Enemy = require('../src/objects/enemy/index.js');
const ClientEngine = require('../src/clientEngine.js');

describe('Enemy', () => {
  let mockClientEngine = null;
  let mockEnemy = null;
  beforeEach(() => {
    mockClientEngine = new ClientEngine();
    mockEnemy = new Enemy(mockClientEngine);
  });
  describe('constructor', () => {
    it('should create Enemy instance', () => {
      expect(mockEnemy).to.be.an.instanceof(Enemy);
    });
  });
  describe('draw', () => {
    it('should call fillRect', () => {
      mockEnemy.game.canvasContext = { fillRect() {} };
      mockEnemy.positionX = 'positionX';
      mockEnemy.positionY = 'positionY';
      mockEnemy.width = 'width';
      mockEnemy.height = 'height';
      sinon.stub(mockEnemy.game.canvasContext, 'fillRect');
      mockEnemy.draw();
      sinon.assert.calledWithExactly(
        mockEnemy.game.canvasContext.fillRect,
        'positionX',
        'positionY',
        'width',
        'height',
      );
      mockEnemy.game.canvasContext.fillRect.restore();
    });
  });
  describe('movement', () => {
    it('should update positionX using time input', () => {
      mockEnemy.positionX = 1000;
      mockEnemy.speed = 20;
      mockEnemy.movement(100);
      expect(mockEnemy.positionX).to.equal(1120);
    });
  });
  describe('boundaryCheck', () => {
    it('should change speed to positive when positionX <= 0 and speed is negative', () => {
      mockEnemy.positionX = -100;
      mockEnemy.speed = -20;
      mockEnemy.boundaryCheck();
      expect(mockEnemy.speed).to.equal(20);
    });
    it('should change speed to negative when positionX + width >= canvas.width and speed is positive', () => {
      mockEnemy.game.canvas = { width: 100 };
      mockEnemy.positionX = 100;
      mockEnemy.width = 20;
      mockEnemy.speed = 20;
      mockEnemy.boundaryCheck();
      expect(mockEnemy.speed).to.equal(-20);
    });
    it('should not change speed when positionX > 0 and positionX + width < canvas.width', () => {
      mockEnemy.game.canvas = { width: 100 };
      mockEnemy.positionX = 20;
      mockEnemy.width = 20;
      mockEnemy.speed = 20;
      mockEnemy.boundaryCheck();
      expect(mockEnemy.speed).to.equal(20);
    });
  });
  describe('update', () => {
    it('should call movement and boundaryCheck', () => {
      sinon.stub(mockEnemy, 'movement');
      sinon.stub(mockEnemy, 'boundaryCheck');
      mockEnemy.update('time');
      sinon.assert.calledWithExactly(mockEnemy.movement, 'time');
      sinon.assert.calledWithExactly(mockEnemy.boundaryCheck);
      mockEnemy.movement.restore();
      mockEnemy.boundaryCheck.restore();
    });
  });
  describe('getState', () => {
    it('should return state', () => {
      mockEnemy.width = 'width';
      mockEnemy.height = 'height';
      mockEnemy.speed = 'speed';
      mockEnemy.positionX = 'positionX';
      mockEnemy.positionY = 'positionY';
      mockEnemy.removeFromGame = 'removeFromGame';
      mockEnemy.stateTargetted = 'stateTargetted';
      mockEnemy.id = 'id';
      expect(mockEnemy.getState()).to.deep.equal({
        width: 'width',
        height: 'height',
        speed: 'speed',
        positionX: 'positionX',
        positionY: 'positionY',
        removeFromGame: 'removeFromGame',
        stateTargetted: 'stateTargetted',
        id: 'id',
      });
    });
  });
});
