const paths = require('../paths');

/**
 * @see https://babeljs.io/docs/en/options
 */
module.exports = function getBabelLoaders(mode) {
  return [
    // Process application JS with Babel.
    // The preset includes JSX, Flow, and some ESnext features.
    {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: [
        paths.appSrc,
        paths.passagesSrc,
        paths.headersSrc,
        paths.footersSrc,
        paths.pluginsSrc,
      ],

      loader: require.resolve('babel-loader'),
      options: {
        /* Allows us to keep .babelrc outside of root directory. */
        babelrcRoots: './config/webpack',

        customize: require.resolve(
          'babel-preset-react-app/webpack-overrides',
        ),

        plugins: [
          ...(
            mode === 'development' ?
              [ require.resolve('react-hot-loader/babel') ] :
              []
          ),

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

        presets: [
          require.resolve('babel-preset-react-app'),
        ],

        // This is a feature of `babel-loader` for webpack (not Babel itself).
        // It enables caching results in ./node_modules/.cache/babel-loader/
        // directory for faster rebuilds.
        cacheDirectory: true,
        // Don't waste time on Gzipping the cache
        cacheCompression: false,
        compact: mode !== 'development',
      },
    },

    // Process any JS outside of the app with Babel.
    // Unlike the application JS, we only compile the standard ES features.
    {
      test: /\.(js|mjs)$/,
      exclude: /@babel(?:\/|\\{1,2})runtime/,
      loader: require.resolve('babel-loader'),
      options: {
        babelrc: false,
        configFile: false,
        compact: false,
        presets: [
          [
            require.resolve('babel-preset-react-app/dependencies'),
            { helpers: true },
          ],
        ],

        cacheDirectory: true,
        // Save disk space when time isn't as important
        cacheCompression: mode !== 'development',
        
        // If an error happens in a package, it's possible to be
        // because it was compiled. Thus, we don't want the browser
        // debugger to show the original code. Instead, the code
        // being evaluated would be much more helpful.
        sourceMaps: false,
      },
    }
  ];
};
