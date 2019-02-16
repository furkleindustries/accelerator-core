import {
  getHtmlWebpackPlugin,
} from './getHtmlWebpackPlugin';
import {
  getInterpolateHtmlPlugin,
} from './getInterpolateHtmlPlugin';
import {
  getManifestPlugin,
} from './getManifestPlugin';
import {
  getTypeScriptForkChecker,
} from './getTypeScriptForkChecker';
import * as ModuleNotFoundPlugin from 'react-dev-utils/ModuleNotFoundPlugin';
import {
  paths,
} from '../paths';
import * as webpack from 'webpack';

export function getCommonPlugins(mode, config) {  
  return [
    getHtmlWebpackPlugin(mode),
    getInterpolateHtmlPlugin(config),

    // This gives some necessary context to module not found errors, such as
    // the requesting resource.
    new ModuleNotFoundPlugin(paths.appPath),
    // Makes NODE_ENV available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }..
    new webpack.DefinePlugin({ NODE_ENV: process.env.NODE_ENV }),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js.
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    getManifestPlugin(),
    // TypeScript type checking
    getTypeScriptForkChecker(),
  ];
}
