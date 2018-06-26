const sinon = require('sinon');
const Player = require('../player.js');
const { expect } = require('chai');

const mockPlayerSpecDefault = {
  width: 15,
  height: 20,
  positionHorizontal: 683,
  positionVertical: 748,
  score: 0,
  speed: 5,
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
      sinon.assert.calledWithExactly(drawingContext.fillRect, 683, 748, 15, 20);
      drawingContext.fillRect.restore();
    });
  });
  describe('update', () => {
    it('should call movement methods with correct parameters', () => {
      const player = new Player(mockPlayerSpecDefault);
      sinon.stub(player, 'movementLeft');
      sinon.stub(player, 'movementRight');
      sinon.stub(player, 'movementUp');
      sinon.stub(player, 'movementDown');
      const canvasElement = {
        width: 'width',
        height: 'height',
      };
      player.update('timeElapsed', canvasElement, 'keyMap');
      sinon.assert.calledWithExactly(player.movementLeft, 'keyMap', 'timeElapsed', 0);
      sinon.assert.calledWithExactly(player.movementRight, 'keyMap', 'timeElapsed', 'width');
      sinon.assert.calledWithExactly(player.movementUp, 'keyMap', 'timeElapsed', 0);
      sinon.assert.calledWithExactly(player.movementDown, 'keyMap', 'timeElapsed', 'height');
      player.movementLeft.restore();
      player.movementRight.restore();
      player.movementUp.restore();
      player.movementDown.restore();
    });
  });
  describe('movementLeft', () => {
    it('should update positionHorizontal correctly when keyMap[37] equals true and within boundaryLeft', () => {
      const player = new Player(mockPlayerSpecDefault);
      player.positionHorizontal = 500;
      player.speed = 10;
      const keyMap = [];
      keyMap[37] = true;
      player.movementLeft(keyMap, 100, 0);
      expect(player.positionHorizontal).to.equal(440);
    });
    it('should not update positionHorizontal when keyMap[37] equals false', () => {
      const player = new Player(mockPlayerSpecDefault);
      player.positionHorizontal = 500;
      player.speed = 10;
      const keyMap = [];
      keyMap[37] = false;
      player.movementLeft(keyMap, 100, 0);
      expect(player.positionHorizontal).to.equal(500);
    });
    it('should set positionHorizontal to equal boundaryLeft if not within boundaryLeft', () => {
      const player = new Player(mockPlayerSpecDefault);
      player.positionHorizontal = 500;
      player.speed = 10;
      const keyMap = [];
      keyMap[37] = true;
      player.movementLeft(keyMap, 100, 1000);
      expect(player.positionHorizontal).to.equal(1000);
    });
  });
  describe('movementRight', () => {
    it('should update positionHorizontal correctly when keyMap[39] equals true and within boundaryRight - width', () => {
      const player = new Player(mockPlayerSpecDefault);
      player.positionHorizontal = 500;
      player.speed = 10;
      const keyMap = [];
      keyMap[39] = true;
      player.movementRight(keyMap, 100, 1000);
      expect(player.positionHorizontal).to.equal(560);
    });
    it('should not update positionHorizontal when keyMap[39] equals false', () => {
      const player = new Player(mockPlayerSpecDefault);
      player.positionHorizontal = 500;
      player.speed = 10;
      const keyMap = [];
      keyMap[39] = false;
      player.movementRight(keyMap, 100, 1000);
      expect(player.positionHorizontal).to.equal(500);
    });
    it('should set positionHorizontal to equal boundaryRight - width if not within boundaryRight', () => {
      const player = new Player(mockPlayerSpecDefault);
      player.positionHorizontal = 500;
      player.speed = 10;
      const keyMap = [];
      keyMap[39] = true;
      player.movementRight(keyMap, 100, 0);
      expect(player.positionHorizontal).to.equal(-15);
    });
  });
  describe('movementUp', () => {
    it('should update positionVertical correctly when keyMap[38] equals true and within boundaryUp', () => {
      const player = new Player(mockPlayerSpecDefault);
      player.positionVertical = 500;
      player.speed = 10;
      const keyMap = [];
      keyMap[38] = true;
      player.movementUp(keyMap, 100, 0);
      expect(player.positionVertical).to.equal(440);
    });
    it('should not update positionVertical when keyMap[38] equals false', () => {
      const player = new Player(mockPlayerSpecDefault);
      player.positionVertical = 500;
      player.speed = 10;
      const keyMap = [];
      keyMap[38] = false;
      player.movementUp(keyMap, 100, 0);
      expect(player.positionVertical).to.equal(500);
    });
    it('should set positionVertical to equal boundaryUp if not within boundaryUp', () => {
      const player = new Player(mockPlayerSpecDefault);
      player.positionVertical = 500;
      player.speed = 10;
      const keyMap = [];
      keyMap[38] = true;
      player.movementUp(keyMap, 100, 1000);
      expect(player.positionVertical).to.equal(1000);
    });
  });
  describe('movementDown', () => {
    it('should update positionVertical correctly when keyMap[40] equals true and within boundaryDown - height', () => {
      const player = new Player(mockPlayerSpecDefault);
      player.positionVertical = 500;
      player.speed = 10;
      const keyMap = [];
      keyMap[40] = true;
      player.movementDown(keyMap, 100, 1000);
      expect(player.positionVertical).to.equal(560);
    });
    it('should not update positionVertical when keyMap[40] equals false', () => {
      const player = new Player(mockPlayerSpecDefault);
      player.positionVertical = 500;
      player.speed = 10;
      const keyMap = [];
      keyMap[40] = false;
      player.movementDown(keyMap, 100, 1000);
      expect(player.positionVertical).to.equal(500);
    });
    it('should set positionVertical to equal boundaryDown - height if not within boundaryDown', () => {
      const player = new Player(mockPlayerSpecDefault);
      player.positionVertical = 500;
      player.speed = 10;
      const keyMap = [];
      keyMap[40] = true;
      player.movementDown(keyMap, 100, 0);
      expect(player.positionVertical).to.equal(-20);
    });
  });
});
