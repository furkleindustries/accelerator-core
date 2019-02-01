const getMinimizers = require('./getMinimizers');

module.exports = function getOptimization(mode, shouldUseSourceMap) {
  const base = {
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    
    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true,
  };

  if (mode === 'development') {
    return base;
  }

  return {
    ...base,
    minimizer: getMinimizers(shouldUseSourceMap),
  };
};
