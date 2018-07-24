const GameEngine = require('./gameEngine.js');

const socket = io();

window.onload = () => {
  // create client game instance
  const client_game = {};
  client_game.engine = new GameEngine();
  client_game.engine.canvas = document.getElementById('canvas');
  client_game.engine.client_init();
  client_game.engine.client_start(socket);


  socket.on('update', (data) => {
    client_game.engine.gameState = data;
    client_game.engine.applyState = true;
  });
  socket.on('connect', () => {
    console.log(socket.id);
  });

  ['keydown', 'keyup'].forEach((eventListener) => {
    client_game.engine.canvas.addEventListener(eventListener, (e) => {
      if (e.keyCode !== 116 && e.keyCode !== 123) {
        e.preventDefault();
      }
      client_game.engine.client_input.keyMap[e.keyCode] = e.type === 'keydown';
    });
  });
};
