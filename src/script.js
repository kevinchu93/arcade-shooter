const gameEngine = require('./gameEngine.js');
const events = require('./events.js');

const socket = io();

window.onload = () => {
  gameEngine.canvas = document.getElementById('canvas');
  gameEngine.clientInit();
  gameEngine.clientStart();
  //events.listen(gameEngine);
  socket.on('update', (data) => {
    gameEngine.gameState = data;
  });
  socket.on('connect', () => {
    console.log(socket.id);
  });

  gameEngine.canvas.addEventListener('keydown', (e) => {
    if (e.keyCode !== 116 && e.keyCode !== 123) {
      e.preventDefault();
    }
    socket.emit('keydown', {
      keyCode: e.keyCode,
    })
  });
  gameEngine.canvas.addEventListener('keyup', (e) => {
    if (e.keyCode !== 116 && e.keyCode !== 123) {
      e.preventDefault();
    }
    socket.emit('keyup', {
      keyCode: e.keyCode,
    })
  });
};
