const sinon = require('sinon');
const Enemy = require('../enemy.js');
const { expect } = require('chai');

const mockEnemySpecDefault = {
  width: 50,
  height: 30,
  positionHorizontal: 350,
  positionVertical: 75,
  speed: 20,
  hitState: false,
  nextEnemy: null,
};

describe('Enemy', () => {
  describe('constructor', () => {
    it('should create mockEnemy with correct parameters', () => {
      const mockEnemy = new Enemy(mockEnemySpecDefault);
      expect(mockEnemy).to.deep.equal(mockEnemySpecDefault);
    });
  });
  describe('getDefaultSpec', () => {
    it('should return correct default property values', () => {
      expect(Enemy.getDefaultSpec()).to.deep.equal(mockEnemySpecDefault);
    });
  });
  describe('canvasFill', () => {
    it('should call drawingContext.fillRect with correct parameters', () => {
      const mockEnemy = new Enemy(mockEnemySpecDefault);
      const drawingContext = {
        fillRect() {},
      };
      const fillRectStub = sinon.stub(drawingContext, 'fillRect');
      mockEnemy.canvasFill(drawingContext);
      sinon.assert.calledWithExactly(drawingContext.fillRect, 350, 75, 50, 30);
      fillRectStub.restore();
    });
  });
  describe('movement', () => {
    it('should update positionHorizontal accordingly using time input', () => {
      const mockEnemy = new Enemy(mockEnemySpecDefault);
      mockEnemy.movement(100);
      expect(mockEnemy.positionHorizontal).to.equal(350 + (20 * (100 / (1000 / 60))));
    });
  });
  describe('boundaryCheck', () => {
    it('should change speed to positive when enemy exceeds boundaryLeft', () => {
      const mockEnemy = new Enemy(mockEnemySpecDefault);
      mockEnemy.speed = -20;
      mockEnemy.boundaryCheck(400, 500);
      expect(mockEnemy.speed).to.equal(20);
    });
    it('should change speed to negative when enemy exceeds boundaryRight', () => {
      const mockEnemy = new Enemy(mockEnemySpecDefault);
      mockEnemy.boundaryCheck(200, 300);
      expect(mockEnemy.speed).to.equal(-20);
    });
  });
  describe('update', () => {
    it('should call boundaryCheck(boundaryLeft, boundaryRight) with correct parameters', () => {
      const mockEnemy = new Enemy(mockEnemySpecDefault);
      sinon.stub(mockEnemy, 'boundaryCheck');
      sinon.stub(mockEnemy, 'movement');
      sinon.stub(mockEnemy, 'hitCheck');
      mockEnemy.update(10, 20, 30, 40);
      sinon.assert.calledWithExactly(mockEnemy.boundaryCheck, 20, 30);
      mockEnemy.boundaryCheck.restore();
      mockEnemy.movement.restore();
      mockEnemy.hitCheck.restore();
    });
    it('should call movement(timeElapsed) with correct parameters', () => {
      const mockEnemy = new Enemy(mockEnemySpecDefault);
      sinon.stub(mockEnemy, 'boundaryCheck');
      sinon.stub(mockEnemy, 'movement');
      sinon.stub(mockEnemy, 'hitCheck');
      mockEnemy.update(10, 20, 30, 40);
      sinon.assert.calledWithExactly(mockEnemy.movement, 10);
      mockEnemy.boundaryCheck.restore();
      mockEnemy.movement.restore();
      mockEnemy.hitCheck.restore();
    });
    it('should call hitCheck(components) with correct parameters', () => {
      const mockEnemy = new Enemy(mockEnemySpecDefault);
      sinon.stub(mockEnemy, 'boundaryCheck');
      sinon.stub(mockEnemy, 'movement');
      sinon.stub(mockEnemy, 'hitCheck');
      mockEnemy.update(10, 20, 30, 40);
      sinon.assert.calledWithExactly(mockEnemy.hitCheck, 40);
      mockEnemy.boundaryCheck.restore();
      mockEnemy.movement.restore();
      mockEnemy.hitCheck.restore();
    });
  });
  describe('append', () => {
    it('should return mockEnemy if head is null', () => {
      const mockEnemy = new Enemy(mockEnemySpecDefault);
      expect(mockEnemy.append(null)).to.equal(mockEnemy);
    });
    it('should set firstEnemy.nextEnemy to equal mockEnemy', () => {
      const mockEnemy = new Enemy(mockEnemySpecDefault);
      const firstEnemy = {
        nextEnemy: null,
      };
      expect(mockEnemy.append(firstEnemy).nextEnemy).to.equal(mockEnemy);
    });
  });
  describe('remove', () => {
    it('should return firstEnemy.nextEnemy if firstEnemy equals mockEnemy', () => {
      const mockEnemy = new Enemy(mockEnemySpecDefault);
      mockEnemy.nextEnemy = 'secondEnemy';
      const firstEnemy = mockEnemy;
      expect(mockEnemy.remove(firstEnemy)).to.equal('secondEnemy');
    });
    it('should return firstEnemy and set firstEnemy.nextEnemy to equal mockEnemy.nextEnemy', () => {
      const mockEnemy = new Enemy(mockEnemySpecDefault);
      mockEnemy.nextEnemy = 'thirdEnemy';
      const firstEnemy = {
        nextEnemy: mockEnemy,
      };
      expect(mockEnemy.remove(firstEnemy).nextEnemy).to.equal('thirdEnemy');
    });
  });
});
