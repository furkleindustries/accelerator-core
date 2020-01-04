import ForkTsCheckerWebpackPlugin from 'react-dev-utils/ForkTsCheckerWebpackPlugin';
import {
  getAllCompiledCodeDirectories,
} from './getAllCompiledCodeDirectories';
import {
  paths,
} from '../paths';
import resolve from 'resolve';
import typescriptFormatter from 'react-dev-utils/typescriptFormatter';

export const getForkTsChecker = () => new ForkTsCheckerWebpackPlugin({
  typescript: resolve.sync('typescript', { basedir: paths.appNodeModules }),
  tslint: true,
  async: process.env.NODE_ENV === 'development',
  useTypescriptIncrementalApi: process.env.NODE_ENV === 'development',
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
  // The formatter is invoked directly in WebpackDevServerUtils during development
  formatter: process.env.NODE_ENV === 'development' ? undefined : typescriptFormatter,
});
