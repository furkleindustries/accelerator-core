const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin-alt');
const paths = require('../paths');
const resolve = require('resolve');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');

module.exports = function getTypeScriptForkChecker() {
  return new ForkTsCheckerWebpackPlugin({
    typescript: resolve.sync('typescript', {
      basedir: paths.appNodeModules,
    }),

    tslint: true,
    async: false,
    checkSyntacticErrors: true,
    tsconfig: paths.appTsConfig,
    compilerOptions: {
      module: 'esnext',
      moduleResolution: 'node',
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: 'preserve',
    },
  
    reportFiles: [
      '**',
      '!**/*.json',
      '!**/__tests__/**',
      '!**/?(*.)(spec|test).*',
      '!src/setupProxy.js',
      '!src/setupTests.*',
    ],
  
    watch: [
      paths.appSrc,
      paths.passagesSrc,
      paths.headersSrc,
      paths.footersSrc,
      paths.pluginsSrc,
    ],
  
    silent: true,
    formatter: typescriptFormatter,
  });
}