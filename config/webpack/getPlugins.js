const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const getCommonPlugins = require('./getCommonPlugins');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('../paths');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const webpack = require('webpack');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = function getPlugins({
  mode,
  modern,
  publicUrl,
  shouldInlineRuntimeChunk,
  useTypeScript,
})
{
  const base = getCommonPlugins(mode, useTypeScript);
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
      exclude: [/\.map$/, /asset-manifest\.json$/],
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
};
