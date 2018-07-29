const ClientEngine = require('./clientEngine.js');

const socket = io();

window.onload = () => {
  const clientEngine = new ClientEngine();
  clientEngine.canvas = document.getElementById('canvas');
  clientEngine.init();
  clientEngine.start(socket);
  console.log(`initial socket: ${socket.id}`); // eslint-disable-line no-console

  socket.on('update', (data) => {
    clientEngine.id = socket.id;
    clientEngine.serverState = data;
    clientEngine.updateWithServerStateRequired = true;
  });

  socket.on('connect', () => { // why does this do nothing in chrome??
    console.log(`connect: ${socket.id}`); // eslint-disable-line no-console
  });

  ['keydown', 'keyup'].forEach((eventListener) => {
    clientEngine.canvas.addEventListener(eventListener, (e) => {
      if (e.keyCode !== 116 && e.keyCode !== 123) {
        e.preventDefault();
      }
      clientEngine.input.data[e.keyCode] = e.type === 'keydown';
    });
  });
};
