const getCssMinimizer = require('./getCssMinimizer');
const getJavaScriptMinimizer = require('./getJavaScriptMinimizer');

module.exports = function getMinimizers(shouldUseSourceMap) {
  return [
    getCssMinimizer(shouldUseSourceMap),
    getJavaScriptMinimizer(shouldUseSourceMap),
  ];
};
