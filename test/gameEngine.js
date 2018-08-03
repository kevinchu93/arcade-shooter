const sinon = require('sinon');
const { expect } = require('chai');
const GameEngine = require('../src/gameEngine.js');
const Timer = require('../src/timer.js');

describe('GameEngine', () => {
  describe('constructor', () => {
    it('should create new GameEngine instance', () => {
      const mockGameEngine = new GameEngine();
      expect(mockGameEngine).to.be.an.instanceof(GameEngine);
    });
  });
  describe('init', () => {
    it('should set properties timer, canvas.width and canvas.height', () => {
      const mockGameEngine = new GameEngine();
      mockGameEngine.canvas = {};
      mockGameEngine.init();
      expect(mockGameEngine.timer).to.be.an.instanceof(Timer);
      expect(mockGameEngine.canvas.width).to.equal(1366);
      expect(mockGameEngine.canvas.height).to.equal(768);
    });
  });
  describe('spawn', () => {
    it('should call enemies.spawn and powerUps.spawn', () => {
      const mockGameEngine = new GameEngine();
      sinon.stub(mockGameEngine.enemies, 'spawn');
      sinon.stub(mockGameEngine.powerUps, 'spawn');
      mockGameEngine.spawn();
      sinon.assert.calledWithExactly(mockGameEngine.enemies.spawn);
      sinon.assert.calledWithExactly(mockGameEngine.powerUps.spawn);
    });
  });
});
