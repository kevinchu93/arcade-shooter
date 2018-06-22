const sinon = require('sinon');
const Enemy = require('../enemy.js');
const { expect } = require('chai');

const mockEnemySpec = {
  width: 50,
  height: 30,
  positionHorizontal: 350,
  positionVertical: 75,
  speed: 20,
  hitState: false,
};

describe('Enemy', () => {
  let enemy = {};
  beforeEach(() => {
    enemy = new Enemy(mockEnemySpec);
  });
  describe('constructor', () => {
    it('should create new enemy instance with correct parameters', () => {
      const instance = new Enemy(mockEnemySpec);
      expect(instance).to.deep.equal(mockEnemySpec);
    });
  });
  describe('canvasFill', () => {
    it('should call drawingContext.fillRect wiht correct parameters', () => {
      const drawingContext = {
        fillRect() {},
      };
      const fillRectStub = sinon.stub(drawingContext, 'fillRect');
      enemy.canvasFill(drawingContext);
      sinon.assert.calledWithExactly(drawingContext.fillRect, 350, 75, 50, 30);
      fillRectStub.restore();
    });
  });
  describe('movement', () => {
    it('should update positionHorizontal accordingly using time input', () => {
      enemy.movement(100);
      expect(enemy.positionHorizontal).to.equal(350 + (20 * (100 / (1000 / 60))));
    });
  });
  describe('boundaryCheck', () => {
    it('should change direction of speed when enemy exceeds boundaryLeft', () => {
      enemy.boundaryCheck(400, 500);
      expect(enemy.speed).to.equal(-20);
    });
    it('should change direction of speed when enemy exceeds boundaryRight', () => {
      enemy.boundaryCheck(200, 300);
      expect(enemy.speed).to.equal(-20);
    });
  });
  describe('update', () => {
    it('should call boundaryCheck(boundaryLeft, boundaryRight) with correct parameters', () => {
      sinon.stub(enemy, 'boundaryCheck');
      enemy.update(10, 20, 30);
      sinon.assert.calledWithExactly(enemy.boundaryCheck, 20, 30);
      enemy.boundaryCheck.restore();
    });
    it('should call movement(timeElapsed) with correct parameters', () => {
      sinon.stub(enemy, 'movement');
      enemy.update(10, 20, 30);
      sinon.assert.calledWithExactly(enemy.movement, 10);
      enemy.movement.restore();
    });
  });

  describe('getDefaultSpec', () => {
    it('should return correct default property values', () => {
      expect(Enemy.getDefaultSpec()).to.deep.equal(mockEnemySpec);
    });
  });
});
