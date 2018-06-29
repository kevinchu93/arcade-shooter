const sinon = require('sinon');
const { expect } = require('chai');
const enemies = require('../components/enemies/index.js');

describe('enemies', () => {
  describe('canvasFill', () => {
    it('should call canvasFill with correct parameters for all enemies', () => {
      let mockEnemy1 = {};
      let mockEnemy2 = {};
      let mockEnemy3 = {};
      mockEnemy1 = {
        canvasFill() {},
        nextEnemy: mockEnemy2 = {
          canvasFill() {},
          nextEnemy: mockEnemy3 = {
            canvasFill() {},
            nextEnemy: null,
          },
        },
      };
      const mockGameArea = {
        canvasElementDrawingContext: null,
      };
      enemies.head = mockEnemy1;
      sinon.stub(mockEnemy1, 'canvasFill');
      sinon.stub(mockEnemy2, 'canvasFill');
      sinon.stub(mockEnemy3, 'canvasFill');
      enemies.canvasFill(mockGameArea);
      sinon.assert.calledWithExactly(
        mockEnemy1.canvasFill,
        mockGameArea.canvasElementDrawingContext,
      );
      sinon.assert.calledWithExactly(
        mockEnemy2.canvasFill,
        mockGameArea.canvasElementDrawingContext,
      );
      sinon.assert.calledWithExactly(
        mockEnemy3.canvasFill,
        mockGameArea.canvasElementDrawingContext,
      );
      mockEnemy1.canvasFill.restore();
      mockEnemy2.canvasFill.restore();
      mockEnemy3.canvasFill.restore();
    });
  });
  describe('update', () => {
    it('should call update with correct parameters for all enemies', () => {
      let mockEnemy1 = {};
      let mockEnemy2 = {};
      let mockEnemy3 = {};
      mockEnemy1 = {
        update() {},
        nextEnemy: mockEnemy2 = {
          update() {},
          nextEnemy: mockEnemy3 = {
            update() {},
            nextEnemy: null,
          },
        },
      };
      enemies.head = mockEnemy1;
      sinon.stub(mockEnemy1, 'update');
      sinon.stub(mockEnemy2, 'update');
      sinon.stub(mockEnemy3, 'update');
      sinon.stub(enemies, 'spawnUpdate');
      enemies.update('timeElapsed', 'boundaryLeft', 'boundaryRight', 'components');
      sinon.assert.calledWithExactly(mockEnemy1.update, 'timeElapsed', 'boundaryLeft', 'boundaryRight', 'components');
      sinon.assert.calledWithExactly(mockEnemy2.update, 'timeElapsed', 'boundaryLeft', 'boundaryRight', 'components');
      sinon.assert.calledWithExactly(mockEnemy3.update, 'timeElapsed', 'boundaryLeft', 'boundaryRight', 'components');
      mockEnemy1.update.restore();
      mockEnemy2.update.restore();
      mockEnemy3.update.restore();
      enemies.spawnUpdate.restore();
    });
    it('should call spawnUpdate with correct parameters', () => {
      sinon.stub(enemies, 'spawnUpdate');
      enemies.update('timeElapsed', 'boundaryLeft', 'boundaryRight', 'components', 'Enemy');
      sinon.assert.calledWithExactly(enemies.spawnUpdate, 'timeElapsed', 'components', 'Enemy');
      enemies.spawnUpdate.restore();
    });
  });
  describe('spawnUpdate', () => {
    it('should decrement countdown by timeElapsed', () => {
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
      sinon.stub(enemies, 'createNew');
      sinon.stub(enemies, 'appendNewEnemy');
      enemies.spawnUpdate(0, mockComponents, 'Enemy');
      expect(mockComponents.enemies.spawn.countdown).to.equal(900);
      enemies.createNew.restore();
      enemies.appendNewEnemy.restore();
    });
    it('should call createNew with correct parameters when countdown <= 0', () => {
      const mockComponents = {
        enemies: {
          spawn: {
            countdown: -100,
            rate: 1000,
          },
        },
      };
      sinon.stub(enemies, 'createNew');
      sinon.stub(enemies, 'appendNewEnemy');
      enemies.spawnUpdate(0, mockComponents, 'Enemy');
      sinon.assert.calledWithExactly(enemies.createNew, 'Enemy');
      enemies.createNew.restore();
      enemies.appendNewEnemy.restore();
    });
    it('should call appendNewEnemy with correct parameters when countdown <= 0', () => {
      const mockComponents = {
        enemies: {
          spawn: {
            countdown: -100,
            rate: 1000,
          },
        },
      };
      sinon.stub(enemies, 'createNew').returns('mockEnemy');
      sinon.stub(enemies, 'appendNewEnemy');
      enemies.spawnUpdate(0, mockComponents, 'Enemy');
      sinon.assert.calledWithExactly(enemies.appendNewEnemy, mockComponents, 'mockEnemy');
      enemies.createNew.restore();
      enemies.appendNewEnemy.restore();
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
      sinon.stub(enemies, 'createNew');
      sinon.stub(enemies, 'appendNewEnemy');
      enemies.spawnUpdate(0, mockComponents, 'Enemy');
      expect(mockComponents.enemies.spawn.countdown).to.equal(100);
      enemies.createNew.restore();
      enemies.appendNewEnemy.restore();
    });
    it('should not call createNew countdown > 0', () => {
      const mockComponents = {
        enemies: {
          spawn: {
            countdown: 100,
            rate: 1000,
          },
        },
      };
      sinon.stub(enemies, 'createNew');
      sinon.stub(enemies, 'appendNewEnemy');
      enemies.spawnUpdate(0, mockComponents, 'Enemy');
      sinon.assert.notCalled(enemies.createNew);
      enemies.createNew.restore();
      enemies.appendNewEnemy.restore();
    });
    it('should not call appendNewEnemy countdown > 0', () => {
      const mockComponents = {
        enemies: {
          spawn: {
            countdown: 100,
            rate: 1000,
          },
        },
      };
      sinon.stub(enemies, 'createNew');
      sinon.stub(enemies, 'appendNewEnemy');
      enemies.spawnUpdate(0, mockComponents, 'Enemy');
      sinon.assert.notCalled(enemies.appendNewEnemy);
      enemies.createNew.restore();
      enemies.appendNewEnemy.restore();
    });
  });
  describe('createNew', () => {
    it('should call Enemy constructor with correct parameter', () => {
      const namespace = {
        Enemy() {
        },
      };
      namespace.Enemy.getDefaultSpec = function getDefaultSpec() {
        return {
          value: 'mockEnemy',
        };
      };
      sinon.stub(namespace, 'Enemy');
      enemies.createNew(namespace.Enemy);
      sinon.assert.calledWithExactly(namespace.Enemy, { value: 'mockEnemy' });
      namespace.Enemy.restore();
    });
  });
  describe('appendNewEnemy', () => {
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
      sinon.stub(mockEnemy, 'append');
      enemies.appendNewEnemy(mockComponents, mockEnemy);
      sinon.assert.calledWithExactly(mockEnemy.append, 'enemyHead');
      mockEnemy.append.restore();
    });
  });
});
