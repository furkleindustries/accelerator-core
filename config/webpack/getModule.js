const getBabelLoaders = require('./getBabelLoaders');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const getStyleLoaders = require('./getStyleLoaders');
const getUnlintedAuthoredDirectories = require('../testing/getUnlintedAuthoredDirectories');
const paths = require('../paths');

// style files regexes
const cssNoModuleRegex = /\.nomodule\.css$/;
const cssRegex = /\.css$/;
const sassNoModuleRegex = /\.nomodule\.s[ac]ss$/;
const sassRegex = /\.s[ac]ss$/;

module.exports = function getModule(mode, publicPath, shouldUseSourceMap) {
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
        exclude: [
          ...getUnlintedAuthoredDirectories(),
        ],
        enforce: 'pre',
        use: [
          /**
           * @see https://github.com/webpack-contrib/eslint-loader
           */
          {
            loader: require.resolve('eslint-loader'),
            options: {
              configFile: paths.resolve(__dirname, '..', '..', '.eslintrc.js'),
              eslintPath: require.resolve('eslint'),
              formatter: require.resolve('react-dev-utils/eslintFormatter'),
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

          // CSS with no modules
          {
            test: cssNoModuleRegex,
            use: getStyleLoaders({
              mode,
              publicPath,
              cssOptions: {
                importLoaders: 1,
                sourceMap: mode !== 'development' && shouldUseSourceMap,
              },
            }),

            // Don't consider CSS imports dead code even if the
            // containing package claims to have no side effects.
            // Remove this when webpack adds a warning or an error for this.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
          },

          // Sass without CSS Modules
          {
            test: sassNoModuleRegex,
            use: getStyleLoaders({              
              mode,
              publicPath,
              cssOptions: {
                importLoaders: 2,
                sourceMap: mode !== 'development' && shouldUseSourceMap,
              },

              preProcessor: 'sass-loader',
            }),
          },

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

          // Adds support for CSS Modules with Sass
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
            exclude: [ /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/ ],
            options: { name: 'static/media/[name].[hash:8].[ext]' },
          },
        ],
      },

      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "file" loader.
    ],
  };
}