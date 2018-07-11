const sinon = require('sinon');
const Enemy = require('../src/objects/enemy/index.js');
const { expect } = require('chai');

const mockEnemySpecs = {
  width: 20,
  height: 10,
  positionX: 350,
  positionY: 75,
  speed: 10,
  stateHit: false,
  nextEnemy: null,
  stateTargetted: false,
};

describe('Enemy', () => {
  describe('constructor', () => {
    it('should create mockEnemy with correct parameters', () => {
      const mockEnemy = new Enemy();
      expect(mockEnemy).to.deep.equal(mockEnemySpecs);
    });
  });
  describe('canvasFill', () => {
    it('should call fillRect with correct parameters', () => {
      const mockEnemy = new Enemy();
      const context = {
        fillRect() {},
      };
      sinon.stub(context, 'fillRect');
      mockEnemy.canvasFill(context);
      sinon.assert.calledWithExactly(
        context.fillRect,
        mockEnemySpecs.positionX,
        mockEnemySpecs.positionY,
        mockEnemySpecs.width,
        mockEnemySpecs.height,
      );
      context.fillRect.restore();
    });
  });
  describe('movement', () => {
    it('should update positionX using time input', () => {
      const mockEnemy = new Enemy();
      mockEnemy.movement(100);
      expect(mockEnemy.positionX)
        .to.equal(mockEnemySpecs.positionX + (mockEnemySpecs.speed * (100 / (1000 / 60))));
    });
  });
  describe('boundaryCheck', () => {
    it('should change speed to positive when enemy exceeds boundaryLeft', () => {
      const mockEnemy = new Enemy();
      mockEnemy.speed = -20;
      mockEnemy.boundaryCheck(400, 500);
      expect(mockEnemy.speed).to.equal(20);
    });
    it('should change speed to negative when enemy exceeds boundaryRight', () => {
      const mockEnemy = new Enemy();
      mockEnemy.speed = 20;
      mockEnemy.boundaryCheck(200, 300);
      expect(mockEnemy.speed).to.equal(-20);
    });
  });
  describe('update', () => {
    it('should call boundaryCheck with correct parameters', () => {
      const mockEnemy = new Enemy();
      sinon.stub(mockEnemy, 'boundaryCheck');
      sinon.stub(mockEnemy, 'movement');
      sinon.stub(mockEnemy, 'hitCheck');
      mockEnemy.update(10, 20, 30, 40);
      sinon.assert.calledWithExactly(mockEnemy.boundaryCheck, 20, 30);
      mockEnemy.boundaryCheck.restore();
      mockEnemy.movement.restore();
      mockEnemy.hitCheck.restore();
    });
    it('should call movement with correct parameters', () => {
      const mockEnemy = new Enemy();
      sinon.stub(mockEnemy, 'boundaryCheck');
      sinon.stub(mockEnemy, 'movement');
      sinon.stub(mockEnemy, 'hitCheck');
      mockEnemy.update(10, 20, 30, 40);
      sinon.assert.calledWithExactly(mockEnemy.movement, 10);
      mockEnemy.boundaryCheck.restore();
      mockEnemy.movement.restore();
      mockEnemy.hitCheck.restore();
    });
    it('should call hitCheck with correct parameters', () => {
      const mockEnemy = new Enemy();
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
  describe('hitCheck', () => {
    it('should call remove with correct parameters if stateHit is true', () => {
      const mockEnemy = new Enemy();
      mockEnemy.stateHit = true;
      const mockComponents = {
        enemies: {
          head: 'head',
        },
      };
      sinon.stub(mockEnemy, 'remove').returns('enemyHead');
      mockEnemy.hitCheck(mockComponents);
      sinon.assert.calledWithExactly(mockEnemy.remove, 'head', { head: 'enemyHead' });
      mockEnemy.remove.restore();
    });
    it('should not call remove if stateHit is false', () => {
      const mockEnemy = new Enemy();
      mockEnemy.stateHit = false;
      const mockComponents = {
        enemies: {
          head: 'head',
        },
      };
      sinon.stub(mockEnemy, 'remove').returns('enemyHead');
      mockEnemy.hitCheck(mockComponents);
      sinon.assert.notCalled(mockEnemy.remove);
      mockEnemy.remove.restore();
    });
    it('should set head to enemyHead when stateHit is true', () => {
      const mockEnemy = new Enemy();
      mockEnemy.stateHit = true;
      const mockComponents = {
        enemies: {
          head: 'head',
        },
      };
      sinon.stub(mockEnemy, 'remove').returns('enemyHead');
      mockEnemy.hitCheck(mockComponents);
      expect(mockComponents.enemies.head).to.be.equal('enemyHead');
      mockEnemy.remove.restore();
    });
  });
  describe('append', () => {
    it('should return mockEnemy if head is null', () => {
      const mockEnemy = new Enemy();
      const mockEnemies = {
        count: 0,
      };
      expect(mockEnemy.append(null, mockEnemies)).to.equal(mockEnemy);
    });
    it('should set firstEnemy.nextEnemy to equal mockEnemy', () => {
      const mockEnemy = new Enemy();
      const mockEnemies = {
        count: 0,
      };
      const firstEnemy = {
        nextEnemy: null,
      };
      expect(mockEnemy.append(firstEnemy, mockEnemies).nextEnemy).to.equal(mockEnemy);
    });
    it('should increment count by 1', () => {
      const mockEnemy = new Enemy();
      const mockEnemies = {
        count: 0,
      };
      const firstEnemy = {
        nextEnemy: null,
      };
      mockEnemy.append(firstEnemy, mockEnemies);
      expect(mockEnemies.count).to.equal(1);
    });
  });
  describe('remove', () => {
    it('should return firstEnemy.nextEnemy if firstEnemy equals mockEnemy', () => {
      const mockEnemy = new Enemy();
      mockEnemy.nextEnemy = 'secondEnemy';
      const firstEnemy = mockEnemy;
      const mockEnemies = {
        count: 0,
        targettedCount: 0,
      };
      expect(mockEnemy.remove(firstEnemy, mockEnemies)).to.equal('secondEnemy');
    });
    it('should return firstEnemy and set firstEnemy.nextEnemy to equal mockEnemy.nextEnemy', () => {
      const mockEnemy = new Enemy();
      mockEnemy.nextEnemy = 'thirdEnemy';
      const firstEnemy = {
        nextEnemy: mockEnemy,
      };
      const mockEnemies = {
        count: 0,
        targettedCount: 0,
      };
      expect(mockEnemy.remove(firstEnemy, mockEnemies).nextEnemy).to.equal('thirdEnemy');
    });
    it('should decrement targettedCount by 1 if stateTargetted is true', () => {
      const mockEnemy = new Enemy();
      mockEnemy.nextEnemy = 'secondEnemy';
      mockEnemy.stateTargetted = true;
      const firstEnemy = mockEnemy;
      const mockEnemies = {
        count: 0,
        targettedCount: 0,
      };
      mockEnemy.remove(firstEnemy, mockEnemies);
      expect(mockEnemies.targettedCount).to.equal(-1);
    });
    it('should decrement count by 1', () => {
      const mockEnemy = new Enemy();
      mockEnemy.nextEnemy = 'secondEnemy';
      const firstEnemy = mockEnemy;
      const mockEnemies = {
        count: 0,
        targettedCount: 0,
      };
      mockEnemy.remove(firstEnemy, mockEnemies);
      expect(mockEnemies.count).to.equal(-1);
    });
  });
});
