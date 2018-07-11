const sinon = require('sinon');
const { expect } = require('chai');
const powerUps = require('../src/components/powerUps/index.js');

describe('powerUps', () => {
  describe('rate', () => {
    it('should call floor function', () => {
      sinon.stub(Math, 'floor');
      sinon.stub(Math, 'random').returns(1);
      powerUps.config.spawn.randomRate();
      sinon.assert.calledWithExactly(Math.floor, powerUps.config.spawn.rate);
      Math.floor.restore();
      Math.random.restore();
    });
    it('should call random function', () => {
      sinon.stub(Math, 'floor');
      sinon.stub(Math, 'random').returns(1);
      powerUps.config.spawn.randomRate();
      sinon.assert.calledWithExactly(Math.random);
      Math.floor.restore();
      Math.random.restore();
    });
  });
  describe('canvasFill', () => {
    it('should call canvasFill with correct parameter', () => {
      const mockPowerUp = {
        canvasFill() {},
        nextPowerUp: null,
      };
      const mockGameArea = {
        canvasContext: null,
      };
      powerUps.head = mockPowerUp;
      sinon.stub(mockPowerUp, 'canvasFill');
      powerUps.canvasFill(mockGameArea);
      sinon.assert.calledWithExactly(mockPowerUp.canvasFill, mockGameArea.canvasContext);
      mockPowerUp.canvasFill.restore();
    });
  });
  describe('update', () => {
    it('should call spawnUpdate correct parameters', () => {
      powerUps.head = null;
      sinon.stub(powerUps, 'spawnUpdate');
      powerUps.update('time', 'components', 'PowerUp', 'gameArea');
      sinon.assert.calledWithExactly(
        powerUps.spawnUpdate,
        'time',
        'components',
        'PowerUp',
        'gameArea',
      );
      powerUps.spawnUpdate.restore();
    });
    it('should call update with correct parameters for all powerUps', () => {
      const mockPowerUp = {
        update() {},
        nextPowerUp: null,
      };
      const gameArea = {
        canvas: {
          height: 'height',
        },
      };
      powerUps.head = mockPowerUp;
      sinon.stub(powerUps, 'spawnUpdate');
      sinon.stub(mockPowerUp, 'update');
      powerUps.update('time', 'components', 'PowerUp', gameArea);
      sinon.assert.calledWithExactly(mockPowerUp.update, 'time', 'height', 'components');
      powerUps.spawnUpdate.restore();
      mockPowerUp.update.restore();
    });
  });
  describe('spawnUpdate', () => {
    it('should decrement countdown by time', () => {
      const mockComponents = {
        powerUps: {
          config: {
            spawn: {
              countdown: 1000,
              rate: 1000,
              randomRate() {
              },
            },
          },
        },
      };
      powerUps.spawnUpdate(500, mockComponents, 'PowerUp', 'gameArea');
      expect(mockComponents.powerUps.config.spawn.countdown).to.equal(500);
    });
    it('should increment countdown by return of randomRate when countdown <= 0', () => {
      const mockComponents = {
        powerUps: {
          config: {
            spawn: {
              countdown: -100,
              rate: 1000,
              randomRate() {
                return this.rate;
              },
            },
          },
        },
      };
      sinon.stub(mockComponents.powerUps.config.spawn, 'randomRate').returns(1000);
      sinon.stub(powerUps, 'create');
      sinon.stub(powerUps, 'appendList');
      powerUps.spawnUpdate(0, mockComponents, 'PowerUp', 'gameArea');
      expect(mockComponents.powerUps.config.spawn.countdown).to.equal(900);
      mockComponents.powerUps.config.spawn.randomRate.restore();
      powerUps.create.restore();
      powerUps.appendList.restore();
    });
    it('should call create with correct parameters when countdown <= 0', () => {
      const mockComponents = {
        powerUps: {
          config: {
            spawn: {
              countdown: -100,
              rate: 1000,
              randomRate() {
                return this.rate;
              },
            },
          },
        },
      };
      sinon.stub(mockComponents.powerUps.config.spawn, 'randomRate').returns(1000);
      sinon.stub(powerUps, 'create');
      sinon.stub(powerUps, 'appendList');
      powerUps.spawnUpdate(0, mockComponents, 'PowerUp', 'gameArea');
      sinon.assert.calledWithExactly(powerUps.create, 'PowerUp', 'gameArea');
      mockComponents.powerUps.config.spawn.randomRate.restore();
      powerUps.create.restore();
      powerUps.appendList.restore();
    });
    it('should call appendList with correct parameters when countdown <= 0', () => {
      const mockComponents = {
        powerUps: {
          config: {
            spawn: {
              countdown: -100,
              rate: 1000,
              randomRate() {
                return this.rate;
              },
            },
          },
        },
      };
      sinon.stub(mockComponents.powerUps.config.spawn, 'randomRate').returns(1000);
      sinon.stub(powerUps, 'create').returns('powerUp');
      sinon.stub(powerUps, 'appendList');
      powerUps.spawnUpdate(0, mockComponents, 'PowerUp', 'gameArea');
      sinon.assert.calledWithExactly(powerUps.appendList, mockComponents, 'powerUp');
      mockComponents.powerUps.config.spawn.randomRate.restore();
      powerUps.create.restore();
      powerUps.appendList.restore();
    });
  });
  describe('create', () => {
    it('should call PowerUp constructor', () => {
      const namespace = {
        PowerUp() {
        },
      };
      const gameArea = {
        canvas: {
          width: 10,
        },
      };
      sinon.stub(namespace, 'PowerUp').returns({});
      powerUps.create(namespace.PowerUp, gameArea);
      sinon.assert.calledWithExactly(namespace.PowerUp);
      namespace.PowerUp.restore();
    });
    it('should return correct powerUp', () => {
      const namespace = {
        PowerUp() {
        },
      };
      const gameArea = {
        canvas: {
          width: 10,
        },
      };
      sinon.stub(namespace, 'PowerUp').returns({});
      const powerUp = powerUps.create(namespace.PowerUp, gameArea);
      expect(powerUp.positionX).to.be.at.least(0).to.be.below(10);
      expect(powerUp.color).to.be.oneOf(powerUps.types);
      namespace.PowerUp.restore();
    });
  });
  describe('appendList', () => {
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
      powerUps.appendList(mockComponents, mockPowerUp);
      sinon.assert.calledWithExactly(mockPowerUp.append, 'powerUpHead');
      mockPowerUp.append.restore();
    });
  });
});
