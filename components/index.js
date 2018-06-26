const bullets = require('./bullets/index.js');
const enemies = require('./enemies/index.js');
const powerUps = require('./powerUps/index.js');

module.exports = {
  bullets: bullets,
  player: null,
  enemies: enemies, 
  powerUps: powerUps,
};
