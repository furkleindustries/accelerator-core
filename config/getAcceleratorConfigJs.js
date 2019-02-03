const config = require('../accelerator.config');
const { defaults } = require('../src/configuration/defaults');

module.exports = function getAcceleratorConfigJs() {
  return Object.freeze({
    ...defaults,
    ...config,
  });
};
