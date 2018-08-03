const sinon = require('sinon');
const { expect } = require('chai');
const ServerEngine = require('../serverEngine.js');
const GameEngine = require('../src/gameEngine.js');
const Player = require('../src/objects/player/index.js');

describe('ServerEngine', () => {
  let mockServerEngine = null;
  beforeEach(() => {
    mockServerEngine = new ServerEngine();
  });
  describe('constructor', () => {
    it('should create new ServerEngine instance', () => {
      expect(mockServerEngine).to.be.an.instanceof(ServerEngine);
    });
  });
  describe('init', () => {
    it('should call super.init, addClient, startPhysicsUpdateLoop, startClientStateUpdateLoop', () => {
      sinon.stub(GameEngine.prototype, 'init');
      sinon.stub(mockServerEngine, 'addClient');
      sinon.stub(mockServerEngine, 'startPhysicsUpdateLoop');
      sinon.stub(mockServerEngine, 'startClientStateUpdateLoop');
      mockServerEngine.init('io', 'socket');
      sinon.assert.calledWithExactly(GameEngine.prototype.init);
      sinon.assert.calledWithExactly(mockServerEngine.addClient, 'socket');
      sinon.assert.calledWithExactly(mockServerEngine.startPhysicsUpdateLoop);
      sinon.assert.calledWithExactly(mockServerEngine.startClientStateUpdateLoop, 'io', 'socket');
      GameEngine.prototype.init.restore();
      mockServerEngine.addClient.restore();
      mockServerEngine.startPhysicsUpdateLoop.restore();
      mockServerEngine.startClientStateUpdateLoop.restore();
    });
  });
  describe('giveDataToClient', () => {
    it('should give data to client', () => {
      mockServerEngine.clients = [
        { id: 1, name: 'kevin', input: 10 },
        { id: 2, name: 'eric', input: 20 },
      ];
      const socket = { id: 1 };
      mockServerEngine.giveDataToClient(socket, 'data');
      expect(mockServerEngine.clients[0].input).to.be.equal('data');
    });
  });
  describe('startPhysicsUpdateLoop', () => {
    before(() => {
      this.clock = sinon.useFakeTimers();
    });
    after(() => {
      this.clock.restore();
    });
    it('should call timer.tick, update, super.spawn', () => {
      mockServerEngine.timer = {
        tick() {},
        deltaTime: 'deltaTime',
      };
      sinon.stub(mockServerEngine.timer, 'tick');
      sinon.stub(mockServerEngine, 'update');
      sinon.stub(GameEngine.prototype, 'spawn');
      mockServerEngine.startPhysicsUpdateLoop();
      this.clock.tick(1000);
      sinon.assert.calledWithExactly(mockServerEngine.timer.tick);
      sinon.assert.calledWithExactly(mockServerEngine.update, 'deltaTime');
      sinon.assert.calledWithExactly(GameEngine.prototype.spawn);
      mockServerEngine.timer.tick.restore();
      mockServerEngine.update.restore();
      GameEngine.prototype.spawn.restore();
    });
  });
  describe('update', () => {
    it('should call updateServer from players, and update from enemies, powerUps, bullets', () => {
      mockServerEngine.clients = 'clients';
      sinon.stub(mockServerEngine.players, 'updateServer');
      sinon.stub(mockServerEngine.enemies, 'update');
      sinon.stub(mockServerEngine.powerUps, 'update');
      sinon.stub(mockServerEngine.bullets, 'update');
      mockServerEngine.update('time');
      sinon.assert.calledWithExactly(mockServerEngine.players.updateServer, 'clients', 'time');
      sinon.assert.calledWithExactly(mockServerEngine.enemies.update, 'time');
      sinon.assert.calledWithExactly(mockServerEngine.powerUps.update, 'time');
      sinon.assert.calledWithExactly(mockServerEngine.bullets.update, 'time');
      mockServerEngine.players.updateServer.restore();
      mockServerEngine.enemies.update.restore();
      mockServerEngine.powerUps.update.restore();
      mockServerEngine.bullets.update.restore();
    });
  });
  describe('startClientStateUpdateLoop', () => {
    before(() => {
      this.clock = sinon.useFakeTimers();
    });
    after(() => {
      this.clock.restore();
    });
    it('should call getState and io.emit', () => {
      const io = { emit() {} };
      sinon.stub(mockServerEngine, 'getState').returns('state');
      sinon.stub(io, 'emit');
      mockServerEngine.startClientStateUpdateLoop(io);
      this.clock.tick(1000);
      sinon.assert.calledWithExactly(mockServerEngine.getState);
      sinon.assert.calledWithExactly(io.emit, 'update', 'state');
      mockServerEngine.getState.restore();
      io.emit.restore();
    });
  });
  describe('getState', () => {
    it('should return state', () => {
      mockServerEngine.clients = [{ clients: 'clients' }];
      sinon.stub(mockServerEngine.players, 'getState').returns('playersState');
      sinon.stub(mockServerEngine.enemies, 'getState').returns('enemiesState');
      sinon.stub(mockServerEngine.powerUps, 'getState').returns('powerUpsState');
      sinon.stub(mockServerEngine.bullets, 'getState').returns('bulletsState');
      mockServerEngine.getState();
      expect(mockServerEngine.getState()).to.be.deep.equal({
        players: { entities: 'playersState' },
        enemies: { entities: 'enemiesState' },
        powerUps: { entities: 'powerUpsState' },
        bullets: { entities: 'bulletsState' },
        clients: [{ clients: 'clients' }],
      });
      mockServerEngine.players.getState.restore();
      mockServerEngine.enemies.getState.restore();
      mockServerEngine.powerUps.getState.restore();
      mockServerEngine.bullets.getState.restore();
    });
  });
  describe('addClient', () => {
    it('should add new player entity', () => {
      const socket = { id: 'id' };
      mockServerEngine.addClient(socket);
      expect(mockServerEngine.players.entities.id).to.be.an.instanceof(Player);
    });
    it('should push data to mockServerEngine.clients', () => {
      const socket = { id: 'id' };
      mockServerEngine.clients = [];
      mockServerEngine.addClient(socket);
      expect(mockServerEngine.clients[0] = {
        id: 'id',
        input: {
          step: null,
          data: [],
        },
      });
    });
  });
  describe('removeClient', () => {
    it('should remove specified entity', () => {
      const socket = { id: 'two' };
      mockServerEngine.players.entities = {
        one: 'first',
        two: 'second',
        three: 'third',
      };
      mockServerEngine.removeClient(socket);
      expect(mockServerEngine.players.entities).to.deep.equal({
        one: 'first',
        three: 'third',
      });
    });
    it('should remove specified client', () => {
      const socket = { id: 'two' };
      mockServerEngine.clients = [
        { id: 'one' },
        { id: 'two' },
        { id: 'three' },
      ];
      mockServerEngine.removeClient(socket);
      expect(mockServerEngine.clients).to.deep.equal([
        { id: 'one' },
        { id: 'three' },
      ]);
    });
  });
  describe('clearLoopIntervals', () => {
    before(() => {
      this.clock = sinon.useFakeTimers();
    });
    after(() => {
      this.clock.restore();
    });
    it('should call clearInterval and stop physicsUpdateInterval and clientStateUpdateInterval', () => {
      let physicsUpdateIntervalCount = 0;
      let clientStateUpdateIntervalCount = 0;
      mockServerEngine.physicsUpdateInterval = setInterval(() => {
        physicsUpdateIntervalCount += 1;
      }, 100);
      mockServerEngine.clientStateUpdateInterval = setInterval(() => {
        clientStateUpdateIntervalCount += 1;
      }, 100);
      this.clock.tick(1000);
      mockServerEngine.clearLoopIntervals();
      expect(physicsUpdateIntervalCount).to.equal(10);
      expect(clientStateUpdateIntervalCount).to.equal(10);
    });
  });
});
