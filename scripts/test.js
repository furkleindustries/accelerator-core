process.env.PUBLIC_URL = '';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const { exec } = require('child_process');
const jest = require('jest');

// Ensure environment variables are read.
require('../config/setBaseEnv')('test');

let argv = process.argv.slice(2);

async function isInGitRepository() {
  try {
    await exec('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

async function isInMercurialRepository() {
  try {
    await exec('hg --cwd . root', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

(async () => {
  const dontWatchIndex = argv.indexOf('--dontWatch');
  if (dontWatchIndex !== -1) {
    argv = argv.slice(0, dontWatchIndex).concat(argv.slice(dontWatchIndex + 1));
  } else if (!process.env.CI &&
             argv.indexOf('--coverage') === -1 &&
             argv.indexOf('--watchAll') === -1)
  {
    // https://github.com/facebook/create-react-app/issues/5210
    const hasSourceControl =
      await isInGitRepository() ||
      await isInMercurialRepository();

    argv.push(hasSourceControl ? '--watch' : '--watchAll');
  }
})();

jest.run(argv);
