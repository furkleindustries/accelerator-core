import * as path from 'path';
import {
  paths,
} from '../paths';

export const getOutput = (mode, publicPath) => {
  const base = { publicPath };

  if (mode === 'development') {
    return {
      ...base,

      // This does not produce a real file. It's just the virtual path that is
      // served by WebpackDevServer in development. This is the JS bundle
      // containing code from all our entry points, and the Webpack runtime.
      filename: 'static/js/bundle.js',

      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: 'static/js/[name].chunk.js',

      // Adds /* filename */ comments to generated require()s in the output.
      pathinfo: true,

      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: (info) => (
        path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
      ),
    };
  }

  return {
    ...base,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: (info) => (
      path
        .relative(paths.appSrc, info.absoluteResourcePath)
        .replace(/\\/g, '/')
    ),

    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',

    // The build folder.
    path: paths.appBuild,

    // Don't build path info into production bundles.
    pathinfo: false,
  };
};
