module.exports = {
  player1: null,
  player2: null,
  canvasFill(gameArea) {
    player1.canvasFill(gameArea.canvasContext);
    player2.canvasFill(gameArea.canvasContext);
  }
  update() {
    player.update(time, canvas, keyMap, components) 
  }
};
