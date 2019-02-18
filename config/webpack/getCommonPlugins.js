import {
  getHandlebarsPlugin,
} from './getHandlebarsPlugin';
import {
  getHtmlPlugin,
} from './getHtmlPlugin';
import {
  getManifestPlugin,
} from './getManifestPlugin';
import {
  getForkTsChecker,
} from './getForkTsChecker';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ModuleNotFoundPlugin from 'react-dev-utils/ModuleNotFoundPlugin';
import {
  paths,
} from '../paths';
import webpack from 'webpack';

export function getCommonPlugins(mode, config) {  
  return [
    getHtmlPlugin(mode),
    /* Handlebars plugin *must* come after HTML plugin. */
    //getHandlebarsPlugin(config, HtmlWebpackPlugin),

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
    getForkTsChecker(),
  ];
}
