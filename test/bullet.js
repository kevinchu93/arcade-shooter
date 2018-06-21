const sinon = require('sinon');
const Bullet = require('../bullet.js');
const assert = require('assert');
const expect = require('chai').expect;

mockBulletSpec = {
  width: 10,
  height: 20,
  speed: 10,
  positionHorizontal: 100,
  positionVertical: 100,
  state: false,
  nextBullet: null,
}

mockBullet = new Bullet(mockBulletSpec);

describe('Bullet', () => {
  let bullet = {};
  beforeEach(() => {
    bullet = new Bullet(mockBulletSpec);
  });
  describe('constructor', () => {
    it('should create new bullet instance with correct parameters', () => {
      let instance = new Bullet(mockBulletSpec);
      expect(instance).to.deep.equal(mockBulletSpec);
    });
  });
  describe('movement', () => {
    it('should update speed accordingly using time input when state is true', () => {
      bullet.state = true;
      bullet.movement(100);
      expect(bullet.positionVertical).to.equal(100 - (10 * (100 / (1000 / 60))));
    });
    it('should not update speed when state is not true', () => {
      bullet.movement(100);
      expect(bullet.positionVertical).to.equal(100);
    });
  });
  describe('boundaryCheck', () => {
    it('should set state to false when positionVertical + height are within boundary input', () => {
      bullet.state = true;
      bullet.boundaryCheck(130);
      expect(bullet.state).to.equal(false);
    });
    it('should not set state to false when positionVertical + height exceed boundary input', () => {
      bullet.state = true;
      bullet.boundaryCheck(110);
      expect(bullet.state).to.equal(true);
    });
  });
  describe('update', () => {
    it('should call boundaryCheck(boundary) with correct parameters', () => {
      let boundaryCheckStub = sinon.stub(bullet, 'boundaryCheck');
      bullet.update(10, 10);
      sinon.assert.calledWithExactly(bullet.boundaryCheck, 10);
      boundaryCheckStub.restore();
    });
    it('should call movement(timeElapsed) with correct parameters', () => {
      let movementStub = sinon.stub(bullet, 'movement');
      bullet.update(10, 10);
      sinon.assert.calledWithExactly(bullet.movement, 10)
      movementStub.restore();
    });
  });
  describe('canvasFill', () => {
    it('should call drawingContext.fillRect wiht correct parameters', () => {
      let drawingContext = {
        fillRect: function() {},
      };
      let fillRectStub = sinon.stub(drawingContext, 'fillRect');
      bullet.canvasFill(drawingContext);
      sinon.assert.calledWithExactly(drawingContext.fillRect, 100, 100, 10, 20);
      fillRectStub.restore();
    });
  });
  describe('getDefaultSpec', () => {
    it('should return correct default property values', () => {
      expect(Bullet.getDefaultSpec()).to.deep.equal({
        width: 5,
        height: 10,
        speed: 20,
        positionHorizontal: undefined,
        positionVertical: undefined,
        state: true,
        nextBullet: null,
      });
    });
  });
});
