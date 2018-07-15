const gameEngine = require('./gameEngine.js');
const events = require('./events.js');

const socket = io();

window.onload = () => {
  gameEngine.init();
  gameEngine.start();
  events.listen(gameEngine);
};
