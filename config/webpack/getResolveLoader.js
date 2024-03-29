import PnpWebpackPlugin from 'pnp-webpack-plugin';

export const getResolveLoader = () => ({
  plugins: [
    // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
    // from the current package.
    PnpWebpackPlugin.moduleLoader(module),
  ],
});
