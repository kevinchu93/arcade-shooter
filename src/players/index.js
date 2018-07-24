module.exports = class {
  constructor() {
    this.entities = {};
  }
  update() {
    Object.keys(this.entities).forEach((key) => {
      this.entities[key].update();
    });
  }
  getState() {
    const state = {};
    Object.keys(this.entities).forEach((key) => {
      state[key] = this.entities[key].getState();
    });
    return state;
  }
  draw(game, gameState) {
    Object.keys(gameState.players.entities).forEach((key) => {
      game.canvasContext.fillRect(
        gameState.players.entities[key].positionX,
        gameState.players.entities[key].positionY,
        gameState.players.entities[key].width,
        gameState.players.entities[key].height,
      );
    });
  }
};
