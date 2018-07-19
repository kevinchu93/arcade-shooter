module.exports = {
  entities: {},
  update() {
    Object.keys(this.entities).forEach((key) => {
      this.entities[key].update();
    });
  },
  getState(gameServer) {
    Object.keys(this.entities).forEach((key) => {
      gameServer.gameState.players.push(this.entities[key].getState(gameServer));
    });
  },
  draw(game, gameState) {
    Object.keys(gameState.players).forEach((key) => {
      game.canvasContext.fillRect(
        gameState.players[key].positionX,
        gameState.players[key].positionY,
        gameState.players[key].width,
        gameState.players[key].height,
      );
    });
  },
};
