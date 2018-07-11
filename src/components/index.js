const bullets = require('./bullets/index.js');
const enemies = require('./enemies/index.js');
const powerUps = require('./powerUps/index.js');

module.exports = {
  keyMap: [],
  bullets,
  player: null,
  enemies,
  powerUps,
};