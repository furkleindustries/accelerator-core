import * as fs from 'fs-extra';
import {
  getNormalizedAcceleratorConfig,
} from '../src/configuration/getNormalizedAcceleratorConfig';
import * as path from 'path';

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const { publicUrl } = getNormalizedAcceleratorConfig();

export const paths = {
  publicUrl,
  moduleFileExtensions: [
    'js',
    'jsx',
    'mjs',
    'ts',
    'tsx',
    'json',
  ],

  appPath: resolveApp('.'),
  appBuild: resolveApp('build-web'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('templates/index.html'),
  appIndex: resolveApp('src/index.tsx'),
  appPackageJson: resolveApp('package.json'),
  acceleratorConfig: resolveApp('accelerator.config.js'),
  appSrc: resolveApp('src/'),
  passagesSrc: resolveApp('passages/'),
  headersSrc: resolveApp('headers/'),
  footersSrc: resolveApp('footers/'),
  pluginsSrc: resolveApp('plugins/'),
  appTsConfig: resolveApp('tsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.ts'),
  proxySetup: resolveApp('src/setupProxy.ts'),
  appNodeModules: resolveApp('node_modules/'),
};
