const getBabelLoaders = require('./getBabelLoaders');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const getFileLoader = require('./getFileLoader');
const getStyleLoaders = require('./getStyleLoaders');
const paths = require('../paths');

// style files regexes
const cssRegex = /\.css$/;
const sassRegex = /\.(scss|sass)$/;

module.exports = function getModule(mode, publicPath) {
  return {
    strictExportPresence: true,
    rules: [
      {
        parser: {
          amd: false,
          // Disable require.ensure as it's not a standard language feature.
          requireEnsure: false,
        }
      },
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        use: [
          /**
           * @see https://github.com/webpack-contrib/eslint-loader
           */
          {
            loader: require.resolve('eslint-loader'),
            options: {
              formatter: require.resolve('react-dev-utils/eslintFormatter'),
              eslintPath: require.resolve('eslint'),   
            },
          },
        ],

        include: [
          paths.appSrc,
          paths.passagesSrc,
          paths.headersSrc,
          paths.footersSrc,
          paths.pluginsSrc,
        ],
      },
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },

          ...getBabelLoaders(mode),

          // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          {
            test: cssRegex,
            use: getStyleLoaders({
              mode,
              publicPath,
              cssOptions: {
                importLoaders: 1,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent,
              }
            }),
          },

          // Adds support for CSS Modules, but using SASS
          {
            test: sassRegex,
            use: getStyleLoaders({
              mode,
              publicPath,
              cssOptions: {
                importLoaders: 2,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent,
              },

              preProcessor: 'sass-loader',
            }),
          },

          getFileLoader(),
        ],
      },

      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "file" loader.
    ],
  };
}