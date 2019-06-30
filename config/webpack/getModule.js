import {
  getAllCompiledCodeDirectories,
} from './getAllCompiledCodeDirectories';
import {
  getBabelLoaders,
} from './getBabelLoaders';
import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent';
import {
  getStyleLoaders,
} from './getStyleLoaders';
import * as path from 'path';

// style files regexes
const cssNoModuleRegex = /\.nomodule\.css$/;
const cssRegex = /\.css$/;
const lessNoModuleRegex = /\.nomodule\.less$/;
const lessRegex = /\.less$/;

export const getModule = (mode, publicPath, shouldUseSourceMap) => ({
  strictExportPresence: true,
  rules: [
    {
      parser: {
        amd: false,
        /* Disable require.ensure as it's not a standard language feature. */
        requireEnsure: false,
      },
    },

    /* First, run the linter.
     * It's important to do this before Babel processes the JS. */
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
            configFile: path.join(__dirname, '..', '..', '.eslintrc.js'),
            eslintPath: require.resolve('eslint'),
            formatter: require.resolve('react-dev-utils/eslintFormatter'),
          },
        },
      ],

      include: getAllCompiledCodeDirectories(),
    },

    {
      /* "oneOf" will traverse all following loaders until one will
       * match the requirements. When no loader matches it will fall
       * back to the "file" loader at the end of the loader list. */
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

        /* CSS with no modules */
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

          /* Don't consider CSS imports dead code even if the
           * containing package claims to have no side effects.
           * Remove this when webpack adds a warning or an error for this.
           * See https://github.com/webpack/webpack/issues/6571 */
          sideEffects: true,
        },

        // LESS without CSS Modules
        {
          test: lessNoModuleRegex,
          use: getStyleLoaders({              
            mode,
            publicPath,
            cssOptions: {
              importLoaders: 2,
              sourceMap: mode !== 'development' && shouldUseSourceMap,
            },

            preProcessor: 'less-loader',
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
            publicPath: publicPath,
          }),
        },

        // Adds support for CSS Modules with LESS
        {
          test: lessRegex,
          use: getStyleLoaders({
            cssOptions: {
              importLoaders: 2,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent,
            },

            mode,
            publicPath,
            preProcessor: 'less-loader',
          }),
        },

        {
          test: /\.mdx?$/,
          use: [
            require.resolve('babel-loader'),
            require.resolve('@mdx-js/loader'),
          ],
        },

        {
          test: /\.ink$/,
          use: require.resolve('inklecate-loader'),
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
          exclude: [ /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.hbs$/, /\.json$/ ],
          options: { name: 'static/media/[name].[hash:8].[ext]' },
        },
      ],
    },

    // ** STOP ** Are you adding a new loader?
    // Make sure to add the new loader(s) before the "file" loader.
  ],
});
