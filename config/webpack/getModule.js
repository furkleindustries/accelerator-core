import {
  getAllCompiledCodeDirectories,
} from './getAllCompiledCodeDirectories';
import {
  getBabelLoaders,
} from './getBabelLoaders';
import {
  getStyleLoaders,
} from './getStyleLoaders';
import {
  join as pathJoin,
} from 'path';
import {
  paths,
} from '../paths';

// style files regexes
const lessNoModuleRegex = new RegExp(/\.nomodule\.less$/);
const lessRegex = new RegExp(/\.less$/);

// Unused for Accelerate.
// const cssNoModuleRegex = new RegExp(/\.nomodule\.css$/);
// const cssRegex = new RegExp(/\.css$/);

const compiledCodeDirectories = getAllCompiledCodeDirectories();

export const getModule = (mode, publicPath, shouldUseSourceMap) => {
  const babelLoaders = getBabelLoaders(mode);

  return {
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
        test: new RegExp(/\.(js|jsx|mjs)$/),
        enforce: 'pre',
        include: compiledCodeDirectories,
        use: [  
          /**
           * @see https://github.com/webpack-contrib/eslint-loader
           */
          {
            loader: require.resolve('eslint-loader'),
            options: {
              configFile: pathJoin(__dirname, '..', '..', '.eslintrc.js'),
              eslintPath: require.resolve('eslint'),
              formatter: require.resolve('react-dev-utils/eslintFormatter'),
            },
          },
        ],
      },

      {
        /* "oneOf" will traverse all following loaders until one will
        * match the requirements. When no loader matches it will fall
        * back to the "file" loader at the end of the loader list. */
        oneOf: [
          {
            test: new RegExp(/\.(ts|tsx)$/),
            use: [
              {
                loader: require.resolve('babel-loader'),
                options: {
                  customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                  plugins: [
                    ...(mode === 'development' ?
                        [ require.resolve('react-hot-loader/babel') ] :
                        []),

                    [
                      require.resolve('babel-plugin-named-asset-import'),
                      {
                        loaderMap: {
                          svg: {
                            ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
                          },
                        },
                      },
                    ],
                  ],

                  presets: [ require.resolve('babel-preset-react-app') ],

                  /* This is a feature of `babel-loader` for webpack (not Babel itself).
                   * It enables caching results in ./node_modules/.cache/babel-loader/
                   * directory for faster rebuilds. */
                  cacheDirectory: true,
                  /* Don't waste time on gzipping the cache. */
                  cacheCompression: false,
                  compact: mode !== 'development',
                },
              },

              {
                loader: require.resolve('ts-loader'),
                options: {
                  experimentalWatchApi: true,
                  transpileOnly: true,
                },
              },
            ],
          },

          ...babelLoaders,

          // Adds support for LESS with CSS Modules enabled.
          {
            test: lessRegex,
            use: [
              ...getStyleLoaders({
                cssOptions: {
                  importLoaders: 2,
                  modules: true,
                },

                mode,
                publicPath,
                preProcessor: 'less-loader',
              }),
            ],
          },

          // LESS without CSS Modules
          {
            test: lessNoModuleRegex,
            include: [
              paths.footers,
              paths.headers,
              paths.passages,
              paths.plugins,
              paths.storyOptions,
            ],

            use: [
              ...getStyleLoaders({              
                mode,
                publicPath,
                cssOptions: {
                  importLoaders: 2,
                  sourceMap: mode !== 'development' && shouldUseSourceMap,
                },

                preProcessor: 'less-loader',
              }),
            ],
          },

          /* Unused for Accelerate.
           * Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          {
            test: cssRegex,
            include: [
              paths.footers,
              paths.headers,
              paths.passages,
              paths.plugins,
              paths.storyOptions,
            ],

            use: [
              ...getStyleLoaders({
                cssOptions: {
                  importLoaders: 1,
                  modules: true,
                },

                mode,
                publicPath,
              }),
            ],

            sideEffects: true,
          }, */

          /* Unused for Accelerate.
           * CSS with no modules.
          {
            test: cssNoModuleRegex,
            use: [
              ...getStyleLoaders({
                mode,
                publicPath,
                cssOptions: {
                  importLoaders: 1,
                  sourceMap: mode !== 'development' && shouldUseSourceMap,
                },
              }),
            ],

            * Don't consider CSS imports dead code even if the
            * containing package claims to have no side effects.
            * Remove this when webpack adds a warning or an error for this.
            * See https://github.com/webpack/webpack/issues/6571 *
            sideEffects: true,
          }, */

          // Ink support.
          {
            test: new RegExp(/\.ink$/),
            include: paths.passages,
            loader: require.resolve('inklecate-loader'),
            options: { countAllVisits: false },
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
            exclude: [
              new RegExp(/\.hbs$/),
              new RegExp(/\.html$/),
              new RegExp(/\.js$/),
              new RegExp(/\.json$/),
              new RegExp(/\.jsx$/),
              new RegExp(/\.mjs$/),
              new RegExp(/\.ts$/),
              new RegExp(/\.tsx$/),
              new RegExp(/\.LICENSE.txt$/),
            ],

            options: {
              name: `${publicPath}[name].[ext]`,
            },
          },
        ],
      },

      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "file" loader.
    ],
  };
};
