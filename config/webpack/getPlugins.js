import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import {
  CleanWebpackPlugin as CleanPlugin
} from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import {
  getCommonPlugins,
} from './getCommonPlugins';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import InlineChunkHtmlPlugin from './InlineChunkHtmlPlugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {
  paths,
} from '../paths';
import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';
import webpack from 'webpack';
import {
  BundleAnalyzerPlugin,
} from 'webpack-bundle-analyzer';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';

export const getPlugins = ({
  config,
  mode,
  shouldInlineRuntimeChunk,
}) => {
  const base = getCommonPlugins(mode, config);

  if (mode === 'development') {
    return [
      ...base,

      // This is necessary to emit hot updates.
      new webpack.HotModuleReplacementPlugin(),

      // Watcher doesn't work well if you mistype casing in a path so we use
      // a plugin that prints an error when you attempt to do this.
      // See https://github.com/facebook/create-react-app/issues/240
      new CaseSensitivePathsPlugin(),

      // If you require a missing module and then `npm install` it, you still have
      // to restart the development server for Webpack to discover it. This plugin
      // makes the discovery automatic so you don't have to restart.
      // See https://github.com/facebook/create-react-app/issues/186
      new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    ];
  }
  
  return [
    ...base,

    /* Reports the progress of the build. */
    new webpack.ProgressPlugin(),

    new CleanPlugin({ cleanOnceBeforeBuildPatterns: true }),

    // Inlines the webpack runtime script. This script is too small to warrant
    // a network request.
    ...(
      shouldInlineRuntimeChunk ?
        [
          new InlineChunkHtmlPlugin(
            HtmlWebpackPlugin,
            [
              new RegExp(/main.+\.chunk\.js$/),
              new RegExp(/runtime~.+\.js$/),
            ],
          ),
        ] :
        []
    ),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output.
      // All options are optional, but re-enabling "ignoreOrder" may cause
      // many warnings.
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      filename: 'static/css/[name].[contenthash:8].css',
      ignoreOrder: true,
    }),

    new webpack.optimize.AggressiveSplittingPlugin(),

    // Generate a service worker script that will precache and update
    // the Webpack HTML and assets.
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      exclude: [
        new RegExp(/\.json$/),
        new RegExp(/\.gitkeep$/),
        new RegExp(/\.gz$/),
        new RegExp(/\.jpg$/),
        new RegExp(/\.map$/),
        new RegExp(/\.mp3$/),
        new RegExp(/\.png$/),
        new RegExp(/\.txt$/),
        new RegExp(/\.webm$/),
        new RegExp(/\.webp$/),
      ],

      inlineWorkboxRuntime: false,
      runtimeCaching: [
        {
          handler: 'CacheFirst',
          urlPattern: new RegExp(/\.(css|js)$/),
          options: {
            plugins: [
              {
                requestWillFetch: async ({ request }) => {
                  request.headers.set('Accept-Encoding', 'gzip');
                },
              }
            ],
          },
        },
      ],

      skipWaiting: true,
    }),

    ...(
      require('../../accelerator.config').default.compressScriptFiles ?
        [
          new CompressionPlugin({
            filename: '[dir]compressed/[name][ext]',
            test: new RegExp(/\.(css|html|js|json|txt)(\.map)?$/),
          }),
        ] :
        []
    ),

    new CopyPlugin({
      patterns: [
        {
          from: paths.appPublic,
          to: paths.appBuild,
          filter: (file) => file !== paths.fontLoaderTemplate,
        },
      ],
    }),

    // new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ];
};
