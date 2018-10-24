'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const jest = require('jest');
let argv = process.argv.slice(2);

/* Watch unless on CI, in coverage mode, explicitly running all tests, or if
 * the --dontWatch option is provided. */
const dontWatchIndex = argv.indexOf('--dontWatch');
if (
  !process.env.CI &&
  argv.indexOf('--coverage') === -1 &&
  argv.indexOf('--watchAll') === -1 &&
  dontWatchIndex === -1
) {
  argv.push('--watch');
}

/* Strip the --dontWatch argument out as Jest doesn't like it. */
if (dontWatchIndex !== -1) {
  argv = argv.slice(0, dontWatchIndex).concat(argv.slice(dontWatchIndex + 1));
}


jest.run(argv);
