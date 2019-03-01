import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {
  getAllCompiledCodeDirectories,
} from './getAllCompiledCodeDirectories';
import {
  paths,
} from '../paths';
import resolve from 'resolve';
import typescriptFormatter from 'react-dev-utils/typescriptFormatter';

export function getForkTsChecker() {
  return new ForkTsCheckerWebpackPlugin({
    typescript: resolve.sync('typescript', {
      basedir: paths.appNodeModules,
    }),

    tslint: true,
    async: true,
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
      '!node_modules/**',
      '!**/*.json',
      '!**/__tests__/**',
      '!**/?(*.)(spec|test).*',
      '!src/setupProxy.js',
      '!src/setupTests.*',
    ],

    watch: getAllCompiledCodeDirectories(),
    silent: true,
    formatter: typescriptFormatter,
  });
}
