module.exports = {
  "extends": "airbnb-base",
  "env": {
    "browser": true,
    "mocha": true,
  },
  "globals" : {
    "io": true,
  },
  "rules": {
    "no-param-reassign": ["error", { "props": false }],
  },
};
