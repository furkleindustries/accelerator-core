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
import webpack from 'webpack';

export function getCommonPlugins(mode, config) {
  return [
    getHtmlPlugin(mode),
    /* Handlebars plugin *must* come after HTML plugin in the array order. */
    new HandlebarsPlugin(config, HtmlWebpackPlugin),

    /* This gives some necessary context to module not found errors, such as
     * the requesting resource. */
    new ModuleNotFoundPlugin(paths.appPath),

    /* Makes NODE_ENV available to the JS code, for example:
     * if (process.env.NODE_ENV === 'development') { ... } */
    new webpack.EnvironmentPlugin([ 'NODE_ENV' ]),

    /* Provides ReactDOM on the global object for Ink React injection.
    new webpack.ProvidePlugin({ ReactDOM: 'react-dom' }),*/

    /* Produces a manifest from the compiled files. */
    getManifestPlugin(),

    /* TypeScript type-checking. Executes on a forked process and cancels the
     * build after the fact if it fails, rather than waiting to start the build
     * until after type-checking passes. */
    getForkTsChecker(),
  ];
}
