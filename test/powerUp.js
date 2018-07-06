const sinon = require('sinon');
const { expect } = require('chai');
const PowerUp = require('../objects/powerUp/index.js');

const mockPowerUpSpecs = {
  radius: 5,
  speed: 2,
  positionX: null,
  positionY: null,
  color: null,
  stateObtained: false,
  nextPowerUp: null,
};

describe('powerUp', () => {
  describe('constructor', () => {
    it('should create powerUp with correct properties', () => {
      const mockPowerUp = new PowerUp();
      expect(mockPowerUp).to.deep.equal(mockPowerUpSpecs);
    });
  });
  describe('canvasFill', () => {
    it('should set fillStyle = powerUP.color', () => {
      const mockPowerUp = new PowerUp();
      mockPowerUp.color = 'orangered';
      const context = {
        fillstyle: null,
        beginPath() {},
        arc() {},
        fill() {},
      };
      sinon.stub(context, 'beginPath');
      sinon.stub(context, 'arc');
      sinon.stub(context, 'fill');
      mockPowerUp.canvasFill(context);
      expect(context.fillStyle).to.equal('orangered');
      context.beginPath.restore();
      context.arc.restore();
      context.fill.restore();
    });
    it('should call beginPath', () => {
      const mockPowerUp = new PowerUp();
      const context = {
        fillstyle: null,
        beginPath() {},
        arc() {},
        fill() {},
      };
      sinon.stub(context, 'beginPath');
      sinon.stub(context, 'arc');
      sinon.stub(context, 'fill');
      mockPowerUp.canvasFill(context);
      sinon.assert.calledWithExactly(context.beginPath);
      context.beginPath.restore();
      context.arc.restore();
      context.fill.restore();
    });
    it('should call arc with correct parameters', () => {
      const mockPowerUp = new PowerUp();
      mockPowerUp.positionX = 10;
      mockPowerUp.positionY = 20;
      mockPowerUp.radius = 2;
      const context = {
        fillstyle: null,
        beginPath() {},
        arc() {},
        fill() {},
      };
      sinon.stub(context, 'beginPath');
      sinon.stub(context, 'arc');
      sinon.stub(context, 'fill');
      mockPowerUp.canvasFill(context);
      sinon.assert.calledWithExactly(context.arc, 10, 20, 2, 0, 2 * Math.PI);
      context.beginPath.restore();
      context.arc.restore();
      context.fill.restore();
    });
    it('should call fill', () => {
      const mockPowerUp = new PowerUp();
      const context = {
        fillstyle: null,
        beginPath() {},
        arc() {},
        fill() {},
      };
      sinon.stub(context, 'beginPath');
      sinon.stub(context, 'arc');
      sinon.stub(context, 'fill');
      mockPowerUp.canvasFill(context);
      sinon.assert.calledWithExactly(context.fill);
      context.beginPath.restore();
      context.arc.restore();
      context.fill.restore();
    });
  });
  describe('movement', () => {
    it('should update positionY using time input', () => {
      const mockPowerUp = new PowerUp();
      mockPowerUp.positionY = 0;
      mockPowerUp.speed = 2;
      const time = 100;
      mockPowerUp.movement(time);
      expect(mockPowerUp.positionY).to.equal(12);
    });
  });
  describe('update', () => {
    it('should call movement with correct parameter', () => {
      const mockPowerUp = new PowerUp();
      sinon.stub(mockPowerUp, 'movement');
      sinon.stub(mockPowerUp, 'boundaryCheck');
      mockPowerUp.update('time', 'boundaryBottom', 'components');
      sinon.assert.calledWithExactly(mockPowerUp.movement, 'time');
      mockPowerUp.movement.restore();
      mockPowerUp.boundaryCheck.restore();
    });
    it('should call boundaryCheck with correct parameters', () => {
      const mockPowerUp = new PowerUp();
      sinon.stub(mockPowerUp, 'movement');
      sinon.stub(mockPowerUp, 'boundaryCheck');
      mockPowerUp.update('time', 'boundaryBottom', 'components');
      sinon.assert.calledWithExactly(mockPowerUp.boundaryCheck, 'boundaryBottom', 'components');
      mockPowerUp.movement.restore();
      mockPowerUp.boundaryCheck.restore();
    });
    it('should call remove with correct parameter if stateObtained = true', () => {
      const mockPowerUp = new PowerUp();
      mockPowerUp.stateObtained = true;
      const mockComponents = {
        powerUps: {
          head: 'head',
        },
      };
      sinon.stub(mockPowerUp, 'movement');
      sinon.stub(mockPowerUp, 'boundaryCheck');
      sinon.stub(mockPowerUp, 'remove');
      mockPowerUp.update('time', 'boundaryBottom', mockComponents);
      sinon.assert.calledWithExactly(mockPowerUp.remove, 'head');
      mockPowerUp.movement.restore();
      mockPowerUp.boundaryCheck.restore();
      mockPowerUp.remove.restore();
    });
  });
  describe('boundarycheck', () => {
    it('should call remove with correct parameter if positionY >= boundaryBottom', () => {
      const mockPowerUp = new PowerUp();
      mockPowerUp.positionY = 10;
      const boundaryBottom = 0;
      const mockComponents = {
        powerUps: {
          head: 'head',
        },
      };
      sinon.stub(mockPowerUp, 'remove');
      mockPowerUp.boundaryCheck(boundaryBottom, mockComponents);
      sinon.assert.calledWithExactly(mockPowerUp.remove, 'head');
      mockPowerUp.remove.restore();
    });
  });
  describe('append', () => {
    it('should return mockPowerUp if head = null', () => {
      const mockPowerUp = new PowerUp();
      expect(mockPowerUp.append(null)).to.equal(mockPowerUp);
    });
    it('should set firstPowerUp.nextPowerUp to equal mockPowerUp', () => {
      const mockPowerUp = new PowerUp();
      const firstPowerUp = {
        nextPowerUp: null,
      };
      expect(mockPowerUp.append(firstPowerUp).nextPowerUp).to.equal(mockPowerUp);
    });
  });
  describe('remove', () => {
    it('should return firstPowerUp.nextPowerUp if firstPowerUp equals mockbullet', () => {
      const mockPowerUp = new PowerUp();
      mockPowerUp.nextPowerUp = 'secondPowerUp';
      const firstPowerUp = mockPowerUp;
      expect(mockPowerUp.remove(firstPowerUp)).to.equal('secondPowerUp');
    });
    it('should return firstPowerUp and set firstPowerUp.nextPowerUp to equal mockPowerUp.nextPowerUp', () => {
      const mockPowerUp = new PowerUp();
      mockPowerUp.nextPowerUp = 'thirdPowerUp';
      const firstPowerUp = {
        nextPowerUp: mockPowerUp,
      };
      expect(mockPowerUp.remove(firstPowerUp).nextPowerUp).to.equal('thirdPowerUp');
    });
  });
});
