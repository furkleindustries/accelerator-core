const fs = require('fs-extra');
const getEmptyNodeModulesMap = require('./getEmptyNodeModulesMap');
const getEntry = require('./getEntry');
const getModule = require('./getModule');
const getOptimization = require('./getOptimization');
const getOutput = require('./getOutput');
const getPlugins = require('./getPlugins');
const getResolve = require('./getResolve');
const getResolveLoader = require('./getResolveLoader');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';

const mode = process.env.NODE_ENV === 'development' ?
  'development' :
  'production';

// Source maps are resource heavy and can cause out of memory issue for large
// source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const devtool = mode === 'development' ?
  'cheap-module-source-map' :
  (shouldUseSourceMap ? 'source-map' : false);

// Some apps do not need the benefits of saving a web request, so not inlining the chunk
// makes for a smoother build process.
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = {
  mode,
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebook/create-react-app/issues/343
  devtool,
  // Don't attempt to continue in production if there are any errors.
  bail: mode !== 'development',
  stats: 'verbose',
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  entry: getEntry(mode),
  resolve: getResolve(),
  resolveLoader: getResolveLoader(),
  module: getModule(mode, publicPath, shouldUseSourceMap),
  optimization: getOptimization(mode, shouldUseSourceMap),
  output: getOutput(mode, publicPath),
  plugins: getPlugins({
    config,
    mode,
    publicPath,
    shouldInlineRuntimeChunk,
  }),

  node: getEmptyNodeModulesMap(),
  // Turn off performance processing because we utilize
  // our own hints via the FileSizeReporter
  performance: false,
};
