const sinon = require('sinon');
const Player = require('../player.js');
const { expect } = require('chai');

const mockPlayerSpec = {
  width: 35,
  height: 20,
  positionHorizontal: 100,
  positionVertical: 748,
  score: 0,
};

describe('Player', () => {
  let player = {};
  beforeEach(() => {
    player = new Player(mockPlayerSpec);
  });
  describe('constructor', () => {
    it('should create new player instance with correct parameters', () => {
      const instance = new Player(mockPlayerSpec);
      expect(instance).to.deep.equal(mockPlayerSpec);
    });
  });
  describe('canvasFill', () => {
    it('should call drawingContext.fillRect wiht correct parameters', () => {
      const drawingContext = {
        fillRect() {},
        fillText() {},
      };
      sinon.stub(drawingContext, 'fillRect');
      player.canvasFill(drawingContext);
      sinon.assert.calledWithExactly(drawingContext.fillRect, 100, 748, 35, 20);
      drawingContext.fillRect.restore();
    });
  });
  describe('getDefaultSpec', () => {
    it('should return correct default property values', () => {
      expect(Player.getDefaultSpec()).to.deep.equal(mockPlayerSpec);
    });
  });
});
