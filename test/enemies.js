const sinon = require('sinon');
const { expect } = require('chai');
const enemies = require('../components/enemies/index.js');

describe('enemies', () => {
  describe('canvasFill', () => {
    it('should call canvasFill with correct parameters', () => {
      const mockEnemy = {
        canvasFill() {},
        nextEnemy: null,
      };
      const mockGameArea = {
        canvasContext: {
          fillText() {},
        },
      };
      enemies.head = mockEnemy;
      sinon.stub(mockEnemy, 'canvasFill');
      sinon.stub(mockGameArea.canvasContext, 'fillText');
      enemies.canvasFill(mockGameArea);
      sinon.assert.calledWithExactly(mockEnemy.canvasFill, mockGameArea.canvasContext);
      mockEnemy.canvasFill.restore();
      mockGameArea.canvasContext.fillText.restore();
    });
    it('should call fillText with correct parameters', () => {
      const mockEnemy = {
        canvasFill() {},
        nextEnemy: null,
      };
      const mockGameArea = {
        canvasContext: {
          fillText() {},
        },
      };
      enemies.head = mockEnemy;
      sinon.stub(mockEnemy, 'canvasFill');
      sinon.stub(mockGameArea.canvasContext, 'fillText');
      enemies.canvasFill(mockGameArea);
      sinon.assert.calledWithExactly(mockGameArea.canvasContext.fillText, 0, 100, 55);
      mockEnemy.canvasFill.restore();
      mockGameArea.canvasContext.fillText.restore();
    });
  });
  describe('update', () => {
    it('should call spawnUpdate with correct parameters', () => {
      const mockEnemy = {
        update() {},
        nextEnemy: null,
      };
      enemies.head = mockEnemy;
      sinon.stub(mockEnemy, 'update');
      sinon.stub(enemies, 'spawnUpdate');
      enemies.update('time', 'boundaryLeft', 'boundaryRight', 'components', 'Enemy');
      sinon.assert.calledWithExactly(enemies.spawnUpdate, 'time', 'components', 'Enemy');
      enemies.spawnUpdate.restore();
      mockEnemy.update.restore();
    });
    it('should call update with correct parameters', () => {
      const mockEnemy = {
        update() {},
        nextEnemy: null,
      };
      enemies.head = mockEnemy;
      sinon.stub(enemies, 'spawnUpdate');
      sinon.stub(mockEnemy, 'update');
      enemies.update('time', 'boundaryLeft', 'boundaryRight', 'components', 'Enemy');
      sinon.assert.calledWithExactly(mockEnemy.update, 'time', 'boundaryLeft', 'boundaryRight', 'components');
      enemies.spawnUpdate.restore();
      mockEnemy.update.restore();
    });
  });
  describe('spawnUpdate', () => {
    it('should decrement countdown by time', () => {
      const mockComponents = {
        enemies: {
          spawn: {
            countdown: 1000,
            rate: 1000,
          },
        },
      };
      enemies.spawnUpdate(500, mockComponents, 'Enemy');
      expect(mockComponents.enemies.spawn.countdown).to.equal(500);
    });
    it('should increment countdown by rate when countdown <= 0', () => {
      const mockComponents = {
        enemies: {
          spawn: {
            countdown: -100,
            rate: 1000,
          },
        },
      };
      sinon.stub(enemies, 'create');
      sinon.stub(enemies, 'appendList');
      enemies.spawnUpdate(0, mockComponents, 'Enemy');
      expect(mockComponents.enemies.spawn.countdown).to.equal(900);
      enemies.create.restore();
      enemies.appendList.restore();
    });
    it('should call create with correct parameters when countdown <= 0', () => {
      const mockComponents = {
        enemies: {
          spawn: {
            countdown: -100,
            rate: 1000,
          },
        },
      };
      sinon.stub(enemies, 'create');
      sinon.stub(enemies, 'appendList');
      enemies.spawnUpdate(0, mockComponents, 'Enemy');
      sinon.assert.calledWithExactly(enemies.create, 'Enemy');
      enemies.create.restore();
      enemies.appendList.restore();
    });
    it('should call appendList with correct parameters when countdown <= 0', () => {
      const mockComponents = {
        enemies: {
          spawn: {
            countdown: -100,
            rate: 1000,
          },
        },
      };
      sinon.stub(enemies, 'create').returns('mockEnemy');
      sinon.stub(enemies, 'appendList');
      enemies.spawnUpdate(0, mockComponents, 'Enemy');
      sinon.assert.calledWithExactly(enemies.appendList, mockComponents, 'mockEnemy');
      enemies.create.restore();
      enemies.appendList.restore();
    });
    it('should not increment countdown by rate when countdown > 0', () => {
      const mockComponents = {
        enemies: {
          spawn: {
            countdown: 100,
            rate: 1000,
          },
        },
      };
      sinon.stub(enemies, 'create');
      sinon.stub(enemies, 'appendList');
      enemies.spawnUpdate(0, mockComponents, 'Enemy');
      expect(mockComponents.enemies.spawn.countdown).to.equal(100);
      enemies.create.restore();
      enemies.appendList.restore();
    });
    it('should not call create countdown > 0', () => {
      const mockComponents = {
        enemies: {
          spawn: {
            countdown: 100,
            rate: 1000,
          },
        },
      };
      sinon.stub(enemies, 'create');
      sinon.stub(enemies, 'appendList');
      enemies.spawnUpdate(0, mockComponents, 'Enemy');
      sinon.assert.notCalled(enemies.create);
      enemies.create.restore();
      enemies.appendList.restore();
    });
    it('should not call appendList countdown > 0', () => {
      const mockComponents = {
        enemies: {
          spawn: {
            countdown: 100,
            rate: 1000,
          },
        },
      };
      sinon.stub(enemies, 'create');
      sinon.stub(enemies, 'appendList');
      enemies.spawnUpdate(0, mockComponents, 'Enemy');
      sinon.assert.notCalled(enemies.appendList);
      enemies.create.restore();
      enemies.appendList.restore();
    });
  });
  describe('create', () => {
    it('should call Enemy constructor', () => {
      const namespace = {
        Enemy() {
        },
      };
      sinon.stub(namespace, 'Enemy');
      enemies.create(namespace.Enemy);
      sinon.assert.calledWithExactly(namespace.Enemy);
      namespace.Enemy.restore();
    });
  });
  describe('appendList', () => {
    it('should call append with correct parameter', () => {
      const mockComponents = {
        enemies: {
          head: 'enemyHead',
        },
      };
      const mockEnemy = {
        append() {
        },
      };
      sinon.stub(mockEnemy, 'append').returns('enemyHead');
      enemies.appendList(mockComponents, mockEnemy);
      sinon.assert.calledWithExactly(mockEnemy.append, 'enemyHead', { head: 'enemyHead' });
      mockEnemy.append.restore();
    });
  });
});
