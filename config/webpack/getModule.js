const getBabelLoaders = require('./getBabelLoaders');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
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
              cssOptions: {
                getLocalIdent: getCSSModuleLocalIdent,
                importLoaders: 1,
                modules: true,
              },

              mode,
              publicPath,
            }),
          },

          // Adds support for CSS Modules, but using SASS
          {
            test: sassRegex,
            use: getStyleLoaders({
              cssOptions: {
                importLoaders: 2,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent,
              },
              
              mode,
              publicPath,
              preProcessor: 'sass-loader',
            }),
          },

          // "file" loader makes sure assets end up in the `build` folder.
          // When you `import` an asset, you get its filename.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: require.resolve('file-loader'),

            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpack's internal loaders.
            exclude: [ /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, ],
            options: { name: 'static/media/[name].[hash:8].[ext]' },
          },
        ],
      },

      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "file" loader.
    ],
  };
}