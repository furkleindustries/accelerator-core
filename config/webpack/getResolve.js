import * as path from 'path';
import {
  paths,
} from '../paths';
import PnpWebpackPlugin from 'pnp-webpack-plugin';

export function getResolve() {
  return {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebook/create-react-app/issues/253
    modules: [ 'node_modules' ].concat(
      // It is guaranteed to exist because we tweak it in `../setBaseEnv.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
    ),

    // This allows esnext, ES module files to be consumed from the `esnext`
    // field in package.json by default, if the field is set.
    mainFields: [
      'esnext',
      'module',
      'browser',
      'main',
    ],

    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebook/create-react-app/issues/290
    extensions: paths.moduleFileExtensions.map((ext) => `.${ext}`),

    alias: {},

    plugins: [
      // Adds support for installing with Plug'n'Play, leading to faster installs and adding
      // guards against forgotten dependencies and such.
      PnpWebpackPlugin,
    ],
  };
}
