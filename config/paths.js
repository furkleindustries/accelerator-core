const fs = require('fs-extra');
const getAcceleratorConfigJs = require('./getAcceleratorConfigJs');
const path = require('path');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const { publicUrl } = getAcceleratorConfigJs();

module.exports = {
  moduleFileExtensions: [
    'web.mjs',
    'mjs',
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
  ],

  publicUrl,
  dotenv: resolveApp('.env'),
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
