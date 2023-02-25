import config from '../../accelerator.config';
import {
  getEmptyNodeModulesMap,
} from './getEmptyNodeModulesMap';
import {
  getEntry,
} from './getEntry';
import {
  getModule,
} from './getModule';
import {
  getOptimization,
} from './getOptimization';
import {
  getOutput,
} from './getOutput';
import {
  getPlugins,
} from './getPlugins';
import {
  getResolve,
} from './getResolve';
import {
  getResolveLoader,
} from './getResolveLoader';
import path from 'path';
import {
  paths,
} from '../paths';

const mode = process.env.NODE_ENV === 'development' ?
  'development' :
  'production';

// Source maps are resource heavy and can cause out of memory issue for large
// source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP === 'true';

const devtool = mode === 'development' ?
  'eval-cheap-module-source-map' :
  (shouldUseSourceMap ? 'eval-source-map' : false);

// Some apps do not need the benefits of saving a web request, so not inlining the chunk
// makes for a smoother build process.
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';

const publicPath = '';

export default {
  // Don't attempt to continue in production if there are any errors.
  bail: mode !== 'development',
  cache: true,
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebook/create-react-app/issues/343
  devtool,
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  entry: getEntry(mode),
  mode,
  module: getModule(mode, publicPath, shouldUseSourceMap),
  node: getEmptyNodeModulesMap(),
  optimization: getOptimization(mode, shouldUseSourceMap),
  output: getOutput(mode, publicPath),
  performance: false,
  plugins: getPlugins({
    config,
    mode,
    shouldInlineRuntimeChunk,
  }),

  recordsOutputPath: path.join(paths.appBuild, 'webpack-records.json'),
  resolve: getResolve(),
  resolveLoader: getResolveLoader(),
  stats: 'normal',
};
