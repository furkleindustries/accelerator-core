const PnpWebpackPlugin = require('pnp-webpack-plugin');

module.exports = function getResolveLoader() {
  return {
    plugins: [
      // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
      // from the current package.
      PnpWebpackPlugin.moduleLoader(module),
    ],
  };
};
