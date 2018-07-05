const sinon = require('sinon');
const Player = require('../objects/player/index.js');
const { expect } = require('chai');

const canvasWidth = 1366;
const canvasHeight = 768;

const mockPlayerSpecs = {
  width: 30,
  height: 20,
  positionX: canvasWidth / 2,
  positionY: canvasHeight - 25,
  speedX: 0,
  speedY: 0,
  maxSpeed: 5,
  accelerationX: 0,
  accelerationY: 0,
  acceleration: 1.2,
  friction: 0.3,
  bulletType: 'white',
  bulletLevel: 0,
  maxBulletLevel: 5,
  score: 0,
};

describe('Player', () => {
  describe('constructor', () => {
    it('should create new player instance with correct parameters', () => {
      const player = new Player(canvasWidth, canvasHeight);
      expect(player).to.deep.equal(mockPlayerSpecs);
    });
  });
  describe('canvasFill', () => {
    it('should call context.fillRect with correct parameters', () => {
      const player = new Player(canvasWidth, canvasHeight);
      const context = {
        fillRect() {},
        fillText() {},
      };
      sinon.stub(context, 'fillRect');
      sinon.stub(context, 'fillText');
      player.canvasFill(context);
      sinon.assert.calledWithExactly(
        context.fillRect, 
        mockPlayerSpecs.positionX,
        mockPlayerSpecs.positionY,
        mockPlayerSpecs.width,
        mockPlayerSpecs.height,
      );
      context.fillRect.restore();
      context.fillText.restore();
    });
    it('should call context.fillRect with correct parameters', () => {
      const player = new Player(canvasWidth, canvasHeight);
      const context = {
        fillRect() {},
        fillText() {},
      };
      sinon.stub(context, 'fillRect');
      sinon.stub(context, 'fillText');
      player.canvasFill(context);
      sinon.assert.calledWithExactly(
        context.fillText, 
        mockPlayerSpecs.score,
        1200,
        55,
      );
      context.fillRect.restore();
      context.fillText.restore();
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
