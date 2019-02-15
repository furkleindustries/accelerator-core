const { exec } = require('child_process');
const {
  error,
  log,
} = require('colorful-logging');
const path = require('path');

log('Subsetting font.');

const notFoundCode = 'MODULE_NOT_FOUND';

let config;
try {
  config = require('../accelerator.config');
} catch (err) {
  if (err.code === notFoundCode) {
    throw new Error('The accelerator config file could not be found.');
  }

  throw err;
}

let glyphhanger;
try {
  glyphhanger = require('glyphhanger');
} catch (err) {
  if (err.code !== notFoundCode) {
    error(err);
    process.exit(1);
  }
}

new Promise((resolve) => {
  if (glyphhanger) {
    return resolve();
  }

  log('Installing glyphhanger dependency.');
  exec('npm install glyphhanger', null, (err) => {
    if (err) {
      error(`Error installing glyphhanger: ${err}`);
      return;
    }

    return resolve();
  });
}).then(
  () => {
    const {
      subsetFont: {
        subsetFrom,
        subsetRange,
        subsetFormat,
      },
    } = config;

    const subsetFrom = config.subsetFont.replace(/\s/g, '-');
    const publicDir = path.join(__dirname, '..', 'public');
    const fontPath = path.join(publicDir, subsetFrom);

    let rangeSegment;
    if (/^us[_-]ascii$/i.test(subsetRange)) {
      rangeSegment = '--US_ASCII';
    } else if (/^latin$/i.test(subsetRange)) {
      rangeSegment = '--LATIN';
    } else {
      if (Array.isArray(subsetRange)) {
        rangeSegment = `--whitelist=${subsetRange.join('')}`;
      } else {
        rangeSegment = `--whitelist=${subsetRange}`;
      }
    }

    let formatSegment = '--formats=';
    if (Array.isArray(subsetFormat)) {
      formatSegment += subsetFormat.join('');
    } else {
      formatSegment += subsetFormat;
    }

    const cmd =
      'glyphhanger ' +
        `--subset=${fontPath} ` +
        `${rangeSegment} ` +
        `${formatSegment} `;

    exec(
      cmd,
      null,
      (err) => {
        if (err) {
          error(`exec error: ${err}`);
          return;
        }

        log('Completed subsetting font.');
      },
    )
  },
  logError,
);
