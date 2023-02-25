import {
  getResolveAliases,
} from './getResolveAliases';
import * as path from 'path';
import {
  paths,
} from '../paths';
import PnpWebpackPlugin from 'pnp-webpack-plugin';

export const getResolve = () => ({
  alias: getResolveAliases(),

  // These are the reasonable defaults supported by the Node ecosystem.
  extensions: paths.moduleFileExtensions.map((ext) => `.${ext}`),

  // This allows esnext, ES module files to be consumed from the `esnext`
  // field in package.json by default, if the field is set.
  mainFields: [
    'esnext',
    'module',
    'browser',
    'main',
  ],

  // This allows you to set a fallback for where Webpack should look for modules.
  // We placed these paths second because we want `node_modules` to "win"
  // if there are any conflicts. This matches Node resolution mechanism.
  modules: [ 'node_modules' ].concat(
    (process.env.NODE_PATH || '')
      .split(path.delimiter)
      .filter(Boolean),
  ),


  plugins: [
    // Adds support for installing with Plug'n'Play, leading to faster installs and adding
    // guards against forgotten dependencies and such.
    PnpWebpackPlugin,
  ],

  symlinks: false,
});
