const sinon = require('sinon');
const { expect } = require('chai');
const ClientEngine = require('../src/clientEngine.js');
const GameEngine = require('../src/gameEngine.js');
this.jsdom = require('jsdom-global')();

describe('ClientEngine', () => {
  let mockClientEngine = null;
  after(() => {
    this.jsdom();
  });
  beforeEach(() => {
    mockClientEngine = new ClientEngine();
  });
  describe('constructor', () => {
    it('should create new ClientEngine instance', () => {
      expect(mockClientEngine).to.be.an.instanceof(ClientEngine);
    });
  });
  describe('init', () => {
    beforeEach(() => {
      mockClientEngine.canvas = {
        focus() {},
        getContext() {
          return 'getContext';
        },
      };
      sinon.stub(mockClientEngine, 'startUpdateLoop');
    });
    afterEach(() => {
      mockClientEngine.startUpdateLoop.restore();
    });
    it('should call super.init', () => {
      mockClientEngine.canvas = {
        focus() {},
        getContext() {},
      };
      sinon.stub(GameEngine.prototype, 'init');
      mockClientEngine.init('socket');
      sinon.assert.calledWithExactly(GameEngine.prototype.init);
      GameEngine.prototype.init.restore();
    });
    it('should set canvas.tabIndex = 1000', () => {
      mockClientEngine.canvas = {
        focus() {},
        getContext() {},
      };
      mockClientEngine.init();
      expect(mockClientEngine.canvas.tabIndex).to.equal(1000);
    });
    it('should set canvasContext to return value of getContext', () => {
      mockClientEngine.init();
      expect(mockClientEngine.canvasContext).to.equal('getContext');
    });
    it('should call startUpdateLoop', () => {
      mockClientEngine.init('socket');
      sinon.assert.calledWithExactly(mockClientEngine.startUpdateLoop, 'socket');
    });
  });
  describe('startUpdateLoop', () => {
    // provides browser globals
    before(() => {
      window.requestAnimationFrame = function requestAnimaionFrame() {};
    });
    beforeEach(() => {
      mockClientEngine.timer = { tick() {} };
      sinon.stub(mockClientEngine.timer, 'tick');
      sinon.stub(mockClientEngine, 'sendInputToServer');
      sinon.stub(mockClientEngine, 'storeInput');
      sinon.stub(mockClientEngine, 'updateWithServerState');
      sinon.stub(mockClientEngine, 'applySavedInputs');
      sinon.stub(mockClientEngine, 'update');
      sinon.stub(mockClientEngine, 'draw');
    });
    afterEach(() => {
      mockClientEngine.timer.tick.restore();
      mockClientEngine.sendInputToServer.restore();
      mockClientEngine.storeInput.restore();
      mockClientEngine.updateWithServerState.restore();
      mockClientEngine.applySavedInputs.restore();
      mockClientEngine.update.restore();
      mockClientEngine.draw.restore();
    });
    it('should call timer.tick, sendInputToServer, storeInput, draw', () => {
      mockClientEngine.startUpdateLoop('socket');
      sinon.assert.calledWithExactly(mockClientEngine.timer.tick);
      sinon.assert.calledWithExactly(mockClientEngine.sendInputToServer, 'socket');
      sinon.assert.calledWithExactly(mockClientEngine.storeInput);
      sinon.assert.calledWithExactly(mockClientEngine.draw);
    });
    it('should call updateWithServerState and applySavedInputs when updateWithServerStateRequired === true', () => {
      mockClientEngine.updateWithServerStateRequired = true;
      mockClientEngine.startUpdateLoop('socket');
      sinon.assert.calledWithExactly(mockClientEngine.updateWithServerState, 'socket');
      sinon.assert.calledWithExactly(mockClientEngine.applySavedInputs);
    });
    it('should call update when updateWithServerStateRequired === false', () => {
      mockClientEngine.updateWithServerStateRequired = false;
      mockClientEngine.input.data = 'data';
      mockClientEngine.timer.deltaTime = 'deltaTime';
      mockClientEngine.startUpdateLoop('socket');
      sinon.assert.calledWithExactly(mockClientEngine.update, 'data', 'deltaTime');
    });
  });
  describe('sendInputToServer', () => {
    it('should call socket.emit with correct arguments', () => {
      mockClientEngine.input = {
        data: 'data',
        step: 0,
      };
      const socket = { emit() {} };
      sinon.stub(socket, 'emit');
      mockClientEngine.sendInputToServer(socket);
      sinon.assert.calledWithExactly(socket.emit, 'input', {
        data: 'data',
        step: 1,
      });
    });
  });
  describe('storeInput', () => {
    it('should call storeInputs.push with correct argument', () => {
      mockClientEngine.input = {
        step: 0,
        data: [0, 1, 2, 3, 4, 5],
      };
      mockClientEngine.timer = {
        deltaTime: 'deltaTime',
      };
      sinon.stub(mockClientEngine.storedInputs, 'push');
      mockClientEngine.storeInput();
      sinon.assert.calledWithExactly(mockClientEngine.storedInputs.push, {
        step: 0,
        data: [0, 1, 2, 3, 4, 5],
        time: 'deltaTime',
      });
    });
  });
  describe('updateWithServerState', () => {
    it('should call updateWithServerState from players, enemies, powerUps, bullets', () => {
      sinon.stub(mockClientEngine.players, 'updateWithServerState');
      sinon.stub(mockClientEngine.enemies, 'updateWithServerState');
      sinon.stub(mockClientEngine.powerUps, 'updateWithServerState');
      sinon.stub(mockClientEngine.bullets, 'updateWithServerState');
      mockClientEngine.updateWithServerState();
      sinon.assert.calledWithExactly(mockClientEngine.players.updateWithServerState);
      sinon.assert.calledWithExactly(mockClientEngine.enemies.updateWithServerState);
      sinon.assert.calledWithExactly(mockClientEngine.powerUps.updateWithServerState);
      sinon.assert.calledWithExactly(mockClientEngine.bullets.updateWithServerState);
      mockClientEngine.players.updateWithServerState.restore();
      mockClientEngine.enemies.updateWithServerState.restore();
      mockClientEngine.powerUps.updateWithServerState.restore();
      mockClientEngine.bullets.updateWithServerState.restore();
    });
  });
  describe('applySavedInputs', () => {
    it('should should call update with correct storedInputs if client id matches engine id ', () => {
      mockClientEngine.id = 0;
      mockClientEngine.serverState = {
        clients: [
          { id: 0, name: 'kevin', input: { step: 10 } },
          { id: 1, name: 'eric', input: { step: 20 } },
        ],
      };
      mockClientEngine.storedInputs = [
        { step: 9, data: 'nine', time: 'nineTime' },
        { step: 10, data: 'ten', time: 'tenTime' },
        { step: 11, data: 'eleven', time: 'elevenTime' },
        { step: 12, data: 'twelve', time: 'twelveTime' },
      ];
      sinon.stub(mockClientEngine, 'update');
      mockClientEngine.applySavedInputs();
      sinon.assert.calledWithExactly(mockClientEngine.update, 'eleven', 'elevenTime');
      sinon.assert.calledWithExactly(mockClientEngine.update, 'twelve', 'twelveTime');
      mockClientEngine.update.restore();
    });
    it('should should not call update if client id does not match engine id', () => {
      mockClientEngine.id = 0;
      mockClientEngine.serverState = {
        clients: [
          { id: 1, name: 'kevin', input: { step: 10 } },
          { id: 2, name: 'eric', input: { step: 20 } },
        ],
      };
      mockClientEngine.storedInputs = [
        { step: 9, data: 'nine', time: 'nineTime' },
        { step: 10, data: 'ten', time: 'tenTime' },
        { step: 11, data: 'eleven', time: 'elevenTime' },
        { step: 12, data: 'twelve', time: 'twelveTime' },
      ];
      sinon.stub(mockClientEngine, 'update');
      mockClientEngine.applySavedInputs();
      sinon.assert.notCalled(mockClientEngine.update);
      mockClientEngine.update.restore();
    });
  });
  describe('update', () => {
    it('should call update from players, enemies, powerUps, bullets', () => {
      sinon.stub(mockClientEngine.players, 'update');
      sinon.stub(mockClientEngine.enemies, 'update');
      sinon.stub(mockClientEngine.powerUps, 'update');
      sinon.stub(mockClientEngine.bullets, 'update');
      mockClientEngine.update('input', 'time');
      sinon.assert.calledWithExactly(mockClientEngine.players.update, 'input', 'time');
      sinon.assert.calledWithExactly(mockClientEngine.enemies.update, 'time');
      sinon.assert.calledWithExactly(mockClientEngine.powerUps.update, 'time');
      sinon.assert.calledWithExactly(mockClientEngine.bullets.update, 'time');
      mockClientEngine.players.update.restore();
      mockClientEngine.enemies.update.restore();
      mockClientEngine.powerUps.update.restore();
      mockClientEngine.bullets.update.restore();
    });
  });
  describe('drawBackground', () => {
    it('should set properties font and fillStyle', () => {
      mockClientEngine.canvasContext = {
        font: null,
        fillStyle: null,
        fillRect() {},
      };
      mockClientEngine.canvas = {
        width: 'width',
        height: 'height',
      };
      sinon.stub(mockClientEngine.canvasContext, 'fillRect');
      mockClientEngine.drawBackground();
      expect(mockClientEngine.canvasContext.font).to.be.equal('bold 48px Arial, sans-serif');
      expect(mockClientEngine.canvasContext.fillStyle).to.be.equal('white');
      mockClientEngine.canvasContext.fillRect.restore();
    });
    it('should call fillRect with correct arguments', () => {
      mockClientEngine.canvasContext = {
        font: null,
        fillStyle: null,
        fillRect() {},
      };
      mockClientEngine.canvas = {
        width: 'width',
        height: 'height',
      };
      sinon.stub(mockClientEngine.canvasContext, 'fillRect');
      mockClientEngine.drawBackground();
      sinon.assert.calledWithExactly(
        mockClientEngine.canvasContext.fillRect,
        0,
        0,
        'width',
        'height',
      );
      mockClientEngine.canvasContext.fillRect.restore();
    });
  });
  describe('draw', () => {
    it('should call drawBackground and draw from players, enemies, powerUps, bullets', () => {
      sinon.stub(mockClientEngine, 'drawBackground');
      sinon.stub(mockClientEngine.players, 'draw');
      sinon.stub(mockClientEngine.enemies, 'draw');
      sinon.stub(mockClientEngine.powerUps, 'draw');
      sinon.stub(mockClientEngine.bullets, 'draw');
      mockClientEngine.draw();
      sinon.assert.calledWithExactly(mockClientEngine.drawBackground);
      sinon.assert.calledWithExactly(mockClientEngine.players.draw);
      sinon.assert.calledWithExactly(mockClientEngine.enemies.draw);
      sinon.assert.calledWithExactly(mockClientEngine.powerUps.draw);
      sinon.assert.calledWithExactly(mockClientEngine.bullets.draw);
      mockClientEngine.drawBackground.restore();
      mockClientEngine.players.draw.restore();
      mockClientEngine.enemies.draw.restore();
      mockClientEngine.powerUps.draw.restore();
      mockClientEngine.bullets.draw.restore();
    });
  });
});
