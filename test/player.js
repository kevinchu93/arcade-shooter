const sinon = require('sinon');
const Player = require('../player.js');
const { expect } = require('chai');

const mockPlayerSpecDefault = {
  width: 35,
  height: 20,
  positionHorizontal: 683,
  positionVertical: 748,
  score: 0,
};

describe('Player', () => {
  describe('constructor', () => {
    it('should create new player instance with correct parameters', () => {
      const player = new Player(mockPlayerSpecDefault);
      expect(player).to.deep.equal(mockPlayerSpecDefault);
    });
  });
  describe('getDefaultSpec', () => {
    it('should return correct default property values', () => {
      const canvasWidth = 1366;
      const canvasHeight = 768;
      expect(Player.getDefaultSpec(canvasWidth, canvasHeight)).to.deep.equal(mockPlayerSpecDefault);
    });
  });
  describe('canvasFill', () => {
    it('should call drawingContext.fillRect with correct parameters', () => {
      const player = new Player(mockPlayerSpecDefault);
      const drawingContext = {
        fillRect() {},
        fillText() {},
      };
      sinon.stub(drawingContext, 'fillRect');
      player.canvasFill(drawingContext);
      sinon.assert.calledWithExactly(drawingContext.fillRect, 683, 748, 35, 20);
      drawingContext.fillRect.restore();
    });
  });
});
