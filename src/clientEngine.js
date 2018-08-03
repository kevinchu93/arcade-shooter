const GameEngine = require('./gameEngine.js');

module.exports = class extends GameEngine {
  constructor() {
    super();
    this.id = null;
    this.input = {
      step: 0,
      data: [],
      time: null,
    };
    this.storedInputs = []; // used for reconcilliation from received server state
    this.updateWithServerStateRequired = false;
    this.serverState = null;
  }
  init(socket) {
    super.init();
    this.canvas.tabIndex = 1000;
    this.canvas.focus();
    this.canvasContext = this.canvas.getContext('2d');
    this.startUpdateLoop(socket);
  }
  startUpdateLoop(socket) {
    const updateLoop = () => {
      this.timer.tick();
      this.sendInputToServer(socket);
      this.storeInput();

      // receiving a updated state from server sets this value to true
      if (this.updateWithServerStateRequired === true) {
        this.updateWithServerState(socket);
        this.applySavedInputs();
        this.updateWithServerStateRequired = false;
      } else {
        this.update(this.input.data, this.timer.deltaTime);
      }
      this.draw();
      window.requestAnimationFrame(updateLoop);
    };
    updateLoop();
  }
  sendInputToServer(socket) {
    this.input.step += 1;
    socket.emit('input', {
      data: this.input.data,
      step: this.input.step,
    });
  }
  storeInput() {
    this.storedInputs.push({
      step: this.input.step,
      data: this.input.data.slice(0),
      time: this.timer.deltaTime,
    });
  }
  updateWithServerState() {
    this.players.updateWithServerState();
    this.enemies.updateWithServerState();
    this.powerUps.updateWithServerState();
    this.bullets.updateWithServerState();
  }
  applySavedInputs() {
    // remove inputs that have already been applied by the server
    const client = this.serverState.clients.find(obj => obj.id === this.id);
    if (client !== undefined) { // occurs when receiving serverState of nonexisting clients
      for (let i = 0; this.storedInputs[i] != null; i += 1) {
        if (this.storedInputs[i].step === client.input.step) {
          this.storedInputs.splice(0, i + 1);
        }
      }
      // apply inputs to interpolate current game state
      for (let i = 0; this.storedInputs[i] != null; i += 1) {
        this.update(this.storedInputs[i].data, this.storedInputs[i].time);
      }
    }
  }
  update(input, time) {
    this.players.update(input, time);
    this.enemies.update(time);
    this.bullets.update(time);
    this.powerUps.update(time);
  }
  drawBackground() {
    this.canvasContext.font = 'bold 48px Arial, sans-serif';
    this.canvasContext.fillStyle = 'black';
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasContext.fillStyle = 'white';
  }
  draw() {
    this.drawBackground();
    this.players.draw();
    this.enemies.draw();
    this.powerUps.draw();
    this.bullets.draw();
  }
};
