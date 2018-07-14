const events = require('./events.js');
const components = require('./components/index.js');
const gameEngine = require('./gameEngine.js');
const Objects = require('./objects/index.js');
const socket = io();

window.onload = () => {
  gameEngine.init(components, Objects.Player);
  gameEngine.start(components, Objects);
  events.listen(Objects.Bullet, gameEngine);
};
