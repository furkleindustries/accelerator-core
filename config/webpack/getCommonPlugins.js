import {
  HandlebarsPlugin,
} from './HandlebarsPlugin';
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
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import webpack from 'webpack';

export const getCommonPlugins = (mode, config) => [
  /* Gets the configured HTML plugin, which produces the HTML document.
   * This must come before the Handlebars plugin. */
  getHtmlPlugin(mode),

  /* Handlebars plugin *must* come after HTML plugin in the array order. */
  new HandlebarsPlugin(config, HtmlWebpackPlugin),

  /* Must come after the Handlebars plugin. */
  new ScriptExtHtmlWebpackPlugin({ defaultAttribute: 'defer' }),

  /* This gives some necessary context to module not found errors, such as
   * the requesting resource. */
  new ModuleNotFoundPlugin(paths.appPath),

  /* Makes NODE_ENV available to the JS code, for example:
   * if (process.env.NODE_ENV === 'development') { ... } */
  new webpack.EnvironmentPlugin([ 'NODE_ENV' ]),

  /* Produces a manifest from the compiled files. */
  getManifestPlugin(),

  /* TypeScript type-checking. Executes on a forked process and cancels the
   * build after the fact if it fails, rather than waiting to start the build
   * until after type-checking passes. */
  getForkTsChecker(),
];
