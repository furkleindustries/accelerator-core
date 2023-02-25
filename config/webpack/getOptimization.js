import {
  getMinimizers,
} from './getMinimizers';

export const getOptimization = (mode, shouldUseSourceMap) => {
  const base = {
    /* Keep the runtime chunk separated to enable long term caching.
     * https://twitter.com/wSokra/status/969679223278505985 */
    runtimeChunk: true,

    /* Automatically split vendor and commons chunks.
     * https://twitter.com/wSokra/status/969633336732905474
     * https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366 */
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  };

  if (mode === 'development') {
    return { ...base };
  }

  return {
    ...base,
    minimizer: getMinimizers(shouldUseSourceMap),
  };
}
