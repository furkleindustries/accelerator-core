import {
  moduleShouldBeTranspiled,
} from './moduleShouldBeTranspiled';
import slash from 'slash';

/**
 * @see https://babeljs.io/docs/en/options
 */
export function getBabelLoaders(mode) {
  return [
    // Process application JS with Babel.
    // The preset includes JSX, Flow, and some ESnext features.
    {
      test: /\.m?jsx?$/,
      include: moduleShouldBeTranspiled,

      loader: require.resolve('babel-loader'),
      options: {
        customize: require.resolve('babel-preset-react-app/webpack-overrides'),
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
                svg: { ReactComponent: '@svgr/webpack?-prettier,-svgo![path]', },
              },
            },
          ],
        ],

        presets: [ require.resolve('babel-preset-react-app') ],

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
      test: /\.m?js$/,
      include(fp) {
        const filepath = slash(fp);
        if (/@babel(?:\/|\\{1,2})runtime/.test(filepath)) {
          return false;
        }

        const alreadySlashed = true;
        return moduleShouldBeTranspiled(filepath, alreadySlashed);
      },

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
}
