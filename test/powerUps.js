const sinon = require('sinon');
const { expect } = require('chai');
const powerUps = require('../components/powerUps/index.js');

describe('powerUps', () => {
  describe('rate', () => {
    it('should call floor function', () => {
      sinon.stub(Math, 'floor');
      sinon.stub(Math, 'random').returns(1);
      powerUps.spawn.rate();
      sinon.assert.calledWithExactly(Math.floor, 10000);
      Math.floor.restore();
      Math.random.restore();
    });
    it('should call random function', () => {
      sinon.stub(Math, 'floor');
      sinon.stub(Math, 'random').returns(1);
      powerUps.spawn.rate();
      sinon.assert.calledWithExactly(Math.random);
      Math.floor.restore();
      Math.random.restore();
    });
  });
  describe('canvasFill', () => {
    it('should call canvasFill with correct parameters for all powerUps', () => {
      let mockPowerUp1 = {};
      let mockPowerUp2 = {};
      let mockPowerUp3 = {};
      mockPowerUp1 = {
        canvasFill() {},
        nextPowerUp: mockPowerUp2 = {
          canvasFill() {},
          nextPowerUp: mockPowerUp3 = {
            canvasFill() {},
            nextPowerUp: null,
          },
        },
      };
      const mockGameArea = {
        canvasElementDrawingContext: null,
      };
      powerUps.head = mockPowerUp1;
      sinon.stub(mockPowerUp1, 'canvasFill');
      sinon.stub(mockPowerUp2, 'canvasFill');
      sinon.stub(mockPowerUp3, 'canvasFill');
      powerUps.canvasFill(mockGameArea);
      sinon.assert.calledWithExactly(
        mockPowerUp1.canvasFill,
        mockGameArea.canvasElementDrawingContext,
      );
      sinon.assert.calledWithExactly(
        mockPowerUp2.canvasFill,
        mockGameArea.canvasElementDrawingContext,
      );
      sinon.assert.calledWithExactly(
        mockPowerUp3.canvasFill,
        mockGameArea.canvasElementDrawingContext,
      );
      mockPowerUp1.canvasFill.restore();
      mockPowerUp2.canvasFill.restore();
      mockPowerUp3.canvasFill.restore();
    });
  });
  describe('update', () => {
    it('should call spawnUpdate correct parameters', () => {
      powerUps.head = null;
      sinon.stub(powerUps, 'spawnUpdate');
      powerUps.update('timeElapsed', 'components', 'PowerUp');
      sinon.assert.calledWithExactly(powerUps.spawnUpdate, 'timeElapsed', 'components', 'PowerUp');
      powerUps.spawnUpdate.restore();
    });
    it('should call update with correct parameters for all powerUps', () => {
      let mockPowerUp1 = {};
      let mockPowerUp2 = {};
      let mockPowerUp3 = {};
      mockPowerUp1 = {
        update() {},
        nextPowerUp: mockPowerUp2 = {
          update() {},
          nextPowerUp: mockPowerUp3 = {
            update() {},
            nextPowerUp: null,
          },
        },
      };
      powerUps.head = mockPowerUp1;
      sinon.stub(powerUps, 'spawnUpdate');
      sinon.stub(mockPowerUp1, 'update');
      sinon.stub(mockPowerUp2, 'update');
      sinon.stub(mockPowerUp3, 'update');
      powerUps.update('timeElapsed', 'components', 'PowerUp');
      sinon.assert.calledWithExactly(mockPowerUp1.update, 'timeElapsed');
      sinon.assert.calledWithExactly(mockPowerUp2.update, 'timeElapsed');
      sinon.assert.calledWithExactly(mockPowerUp3.update, 'timeElapsed');
      powerUps.spawnUpdate.restore();
      mockPowerUp1.update.restore();
      mockPowerUp2.update.restore();
      mockPowerUp3.update.restore();
    });
  });
  describe('spawnUpdate', () => {
    it('should decrement countdown by timeElapsed', () => {
      const mockComponents = {
        powerUps: {
          spawn: {
            countdown: 1000,
            rate() {
            },
          },
        },
      };
      powerUps.spawnUpdate(500, mockComponents, 'PowerUp');
      expect(mockComponents.powerUps.spawn.countdown).to.equal(500);
    });
    it('should increment countdown by rate when countdown <= 0', () => {
      const mockComponents = {
        powerUps: {
          spawn: {
            countdown: -100,
            rate() {
              return 1000;
            },
          },
        },
      };
      sinon.stub(powerUps, 'createNew');
      sinon.stub(powerUps, 'appendNewPowerUp');
      powerUps.spawnUpdate(0, mockComponents, 'PowerUp');
      expect(mockComponents.powerUps.spawn.countdown).to.equal(900);
      powerUps.createNew.restore();
      powerUps.appendNewPowerUp.restore();
    });
    it('should call createNew with correct parameters when countdown <= 0', () => {
      const mockComponents = {
        powerUps: {
          spawn: {
            countdown: -100,
            rate() {
            },
          },
        },
      };
      sinon.stub(powerUps, 'createNew');
      sinon.stub(powerUps, 'appendNewPowerUp');
      powerUps.spawnUpdate(0, mockComponents, 'PowerUp');
      sinon.assert.calledWithExactly(powerUps.createNew, 'PowerUp');
      powerUps.createNew.restore();
      powerUps.appendNewPowerUp.restore();
    });
    it('should call appendNewPowerUp with correct parameters when countdown <= 0', () => {
      const mockComponents = {
        powerUps: {
          spawn: {
            countdown: -100,
            rate() {
            },
          },
        },
      };
      sinon.stub(powerUps, 'createNew').returns('mockPowerUp');
      sinon.stub(powerUps, 'appendNewPowerUp');
      powerUps.spawnUpdate(0, mockComponents, 'PowerUp');
      sinon.assert.calledWithExactly(powerUps.appendNewPowerUp, mockComponents, 'mockPowerUp');
      powerUps.createNew.restore();
      powerUps.appendNewPowerUp.restore();
    });
    it('should not increment countdown by rate when countdown > 0', () => {
      const mockComponents = {
        powerUps: {
          spawn: {
            countdown: 100,
            rate() {
            },
          },
        },
      };
      sinon.stub(powerUps, 'createNew');
      sinon.stub(powerUps, 'appendNewPowerUp');
      powerUps.spawnUpdate(0, mockComponents, 'PowerUp');
      expect(mockComponents.powerUps.spawn.countdown).to.equal(100);
      powerUps.createNew.restore();
      powerUps.appendNewPowerUp.restore();
    });
    it('should not call createNew countdown > 0', () => {
      const mockComponents = {
        powerUps: {
          spawn: {
            countdown: 100,
            rate() {
            },
          },
        },
      };
      sinon.stub(powerUps, 'createNew');
      sinon.stub(powerUps, 'appendNewPowerUp');
      powerUps.spawnUpdate(0, mockComponents, 'PowerUp');
      sinon.assert.notCalled(powerUps.createNew);
      powerUps.createNew.restore();
      powerUps.appendNewPowerUp.restore();
    });
    it('should not call appendNewPowerUp countdown > 0', () => {
      const mockComponents = {
        powerUps: {
          spawn: {
            countdown: 100,
            rate() {
            },
          },
        },
      };
      sinon.stub(powerUps, 'createNew');
      sinon.stub(powerUps, 'appendNewPowerUp');
      powerUps.spawnUpdate(0, mockComponents, 'PowerUp');
      sinon.assert.notCalled(powerUps.appendNewPowerUp);
      powerUps.createNew.restore();
      powerUps.appendNewPowerUp.restore();
    });
  });
  describe('createNew', () => {
    it('should call PowerUp constructor with correct parameter', () => {
      const namespace = {
        PowerUp() {
        },
      };
      namespace.PowerUp.getDefaultSpec = function getDefaultSpec() {
        return {
          value: 'mockPowerUp',
        };
      };
      sinon.stub(namespace, 'PowerUp');
      powerUps.createNew(namespace.PowerUp);
      sinon.assert.calledWithExactly(namespace.PowerUp, { value: 'mockPowerUp' });
      namespace.PowerUp.restore();
    });
    it('should return correct powerUp', () => {
      const namespace = {
        PowerUp() {
        },
      };
      namespace.PowerUp.getDefaultSpec = function getDefaultSpec() {
        return {
          value: 'mockPowerUp',
        };
      };
      sinon.stub(namespace, 'PowerUp');
      sinon.stub(Math, 'random').returns(0);
      expect(powerUps.createNew(namespace.PowerUp)).to.deep.equal({
        positionHorizontal: 0,
        color: 'deepskyblue',
      });
      namespace.PowerUp.restore();
      Math.random.restore();
    });
  });
  describe('appendNewPowerUp', () => {
    it('should call append with correct parameter', () => {
      const mockComponents = {
        powerUps: {
          head: 'powerUpHead',
        },
      };
      const mockPowerUp = {
        append() {
        },
      };
      sinon.stub(mockPowerUp, 'append');
      powerUps.appendNewPowerUp(mockComponents, mockPowerUp);
      sinon.assert.calledWithExactly(mockPowerUp.append, 'powerUpHead');
      mockPowerUp.append.restore();
    });
  });
});
