const sinon = require('sinon');
const { expect } = require('chai');
const PowerUp = require('../src/objects/powerUp/index.js');
const ClientEngine = require('../src/clientEngine.js');

describe('powerUp', () => {
  let mockClientEngine = null;
  let mockPowerUp = null;
  beforeEach(() => {
    mockClientEngine = new ClientEngine();
    mockClientEngine.width = 100;
    mockPowerUp = new PowerUp(mockClientEngine);
  });
  describe('constructor', () => {
    it('should create PowerUp instance', () => {
      expect(mockPowerUp).to.be.an.instanceof(PowerUp);
    });
  });
  describe('draw', () => {
    beforeEach(() => {
      mockPowerUp.game.canvasContext = {
        fillStyle: null,
        beginPath() {},
        arc() {},
        fill() {},
      };
      mockPowerUp.positionX = 'positionX';
      mockPowerUp.positionY = 'positionY';
      mockPowerUp.radius = 'radius';
      sinon.stub(mockPowerUp.game.canvasContext, 'beginPath');
      sinon.stub(mockPowerUp.game.canvasContext, 'arc');
      sinon.stub(mockPowerUp.game.canvasContext, 'fill');
    });
    afterEach(() => {
      mockPowerUp.game.canvasContext.beginPath.restore();
      mockPowerUp.game.canvasContext.arc.restore();
      mockPowerUp.game.canvasContext.fill.restore();
    });
    it('should set fillStyle', () => {
      mockPowerUp.color = 'color';
      mockPowerUp.draw();
      expect(mockPowerUp.game.canvasContext.fillStyle).to.equal('color');
    });
    it('should call beginPath, arc, fill', () => {
      mockPowerUp.draw();
      sinon.assert.calledWithExactly(mockPowerUp.game.canvasContext.beginPath);
      sinon.assert.calledWithExactly(
        mockPowerUp.game.canvasContext.arc,
        'positionX',
        'positionY',
        'radius',
        0,
        2 * Math.PI,
      );
      sinon.assert.calledWithExactly(mockPowerUp.game.canvasContext.fill);
    });
  });
  describe('update', () => {
    it('should call movement and boundaryCheck', () => {
      sinon.stub(mockPowerUp, 'movement');
      sinon.stub(mockPowerUp, 'boundaryCheck');
      mockPowerUp.update('time');
      sinon.assert.calledWithExactly(mockPowerUp.movement, 'time');
      sinon.assert.calledWithExactly(mockPowerUp.boundaryCheck);
      mockPowerUp.movement.restore();
      mockPowerUp.boundaryCheck.restore();
    });
  });
  describe('movement', () => {
    it('should update positionY using time input', () => {
      mockPowerUp.positionY = 1000;
      mockPowerUp.speed = 20;
      mockPowerUp.movement(100);
      expect(mockPowerUp.positionY).to.equal(1120);
    });
  });
  describe('boundaryCheck', () => {
    it('should set removeFromgame = true when positionY >= canvas.height', () => {
      mockPowerUp.removeFromGame = false;
      mockPowerUp.positionY = 200;
      mockPowerUp.game.canvas = { height: 100 };
      mockPowerUp.boundaryCheck();
      expect(mockPowerUp.removeFromGame).to.equal(true);
    });
    it('should not set removeFromgame = true when positionY < canvas.height', () => {
      mockPowerUp.removeFromGame = false;
      mockPowerUp.positionY = 50;
      mockPowerUp.game.canvas = { height: 100 };
      mockPowerUp.boundaryCheck();
      expect(mockPowerUp.removeFromGame).to.equal(false);
    });
  });
  describe('getState', () => {
    it('should return state', () => {
      mockPowerUp.radius = 'radius';
      mockPowerUp.speed = 'speed';
      mockPowerUp.positionX = 'positionX';
      mockPowerUp.positionY = 'positionY';
      mockPowerUp.color = 'color';
      mockPowerUp.removeFromGame = 'removeFromGame';
      expect(mockPowerUp.getState()).to.deep.equal({
        radius: 'radius',
        speed: 'speed',
        positionX: 'positionX',
        positionY: 'positionY',
        color: 'color',
        removeFromGame: 'removeFromGame',
      });
    });
  });
});
