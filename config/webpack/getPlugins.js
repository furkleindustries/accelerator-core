import * as CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import {
  getCommonPlugins,
} from './getCommonPlugins';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as InlineChunkHtmlPlugin from 'react-dev-utils/InlineChunkHtmlPlugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as path from 'path';
import {
  paths,
} from '../paths';
import * as WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';
import * as webpack from 'webpack';
import * as WorkboxWebpackPlugin from 'workbox-webpack-plugin';

export function getPlugins({
  config,
  mode,
  publicUrl,
  shouldInlineRuntimeChunk,
})
{
  const base = getCommonPlugins(mode, config);
  if (mode === 'development') {
    return [
      ...base,

      // This is necessary to emit hot updates:
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

    // Inlines the webpack runtime script. This script is too small to warrant
    // a network request.
    ...(
      shouldInlineRuntimeChunk ?
        [ new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [ /runtime~.+[.]js/ ]) ] :
        []
    ),

    // This creates a performance profile of the plugins. It can be read by
    // opening the file in the Performance tab of the Chrome dev tools.
    new webpack.debug.ProfilingPlugin({
      outputPath: path.join(
        __dirname,
        '..',
        '..',
        'build-web',
        'pluginsProfile.json',
      ),
    }),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    
    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      exclude: [
        /\.map$/,
        /asset-manifest\.json$/,
      ],

      importWorkboxFrom: 'cdn',
      navigateFallback: `${publicUrl}/index.html`,
      navigateFallbackBlacklist: [
        // Exclude URLs starting with /_, as they're likely an API call
        new RegExp('^/_'),
        // Exclude URLs containing a dot, as they're likely a resource in
        // public/ and not a SPA route
        new RegExp('/[^/]+\\.[^/]+$'),
      ],
    }),
  ];
}
