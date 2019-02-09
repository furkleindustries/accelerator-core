const getAcceleratorConfigJs = require('../getAcceleratorConfigJs');
const getHtmlWebpackPlugin = require('./getHtmlWebpackPlugin');
const getManifestPlugin = require('./getManifestPlugin');
const getTypeScriptForkChecker = require('./getTypeScriptForkChecker');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const paths = require('../paths');
const webpack = require('webpack');

// Get the accelerator config.
const config = getAcceleratorConfigJs();

module.exports = function getCommonPlugins(mode) {  
  return [
    getHtmlWebpackPlugin(mode),
    // Makes the config variables available in index.html.
    // The public URL is available as %publicUrl% in index.html,
    // e.g.: <link rel="shortcut icon" href="%publicUrl%/favicon.ico">
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, config),
    // This gives some necessary context to module not found errors, such as
    // the requesting resource.
    new ModuleNotFoundPlugin(paths.appPath),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `./setBaseEnv.js`.
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
