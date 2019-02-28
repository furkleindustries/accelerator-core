module.exports = {};
module.exports.SinglePassageRenderer = class SinglePassageRenderer {
  config = null;
  context = null;

  constructor(config, context) {
    this.config = config;
    this.context = context;
  }
};
