import './functions/setUnhandledRejectionEvent';
import '../config/setProductionEnv';

import bfj from 'bfj';
import chalk from 'chalk';
import {
  checkBrowsers,
} from 'react-dev-utils/browsersHelper';
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles';
import {
  error,
  log,
  warn,
} from 'colorful-logging';
import FileSizeReporter from 'react-dev-utils/FileSizeReporter';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
import * as fs from 'fs-extra';
import config from '../config/webpack/webpack.config';
import * as path from 'path';
import {
  paths,
} from '../config/paths';
import printHostingInstructions from 'react-dev-utils/printHostingInstructions';
import printBuildError from 'react-dev-utils/printBuildError';
import webpack from 'webpack';

const appPackage = require(paths.appPackageJson);

const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

const {
  stdout: { isTTY: isInteractive },
} = process;

// Warn and crash if required files are missing
if (!checkRequiredFiles([ paths.fontLoaderTemplate, paths.appIndex, ])) {
  process.exit(1);
}

// Process CLI arguments
const argv = process.argv.slice(2);
const writeStatsJson = argv.indexOf('--stats') !== -1;

// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
checkBrowsers(paths.appPath, isInteractive)
  .then(() => (
    // First, read the current file sizes in build directory.
    // This lets us display how much they changed later.
    measureFileSizesBeforeBuild(paths.appBuild)
  )).then((previousFileSizes) => {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    fs.emptyDirSync(paths.appBuild);
    // Merge with the public folder
    copyPublicFolder();
    // Start the webpack build
    return build(previousFileSizes);
  }).then(
    ({
      stats,
      previousFileSizes,
      warnings,
    }) => {
      if (warnings.length) {
        warn('Compiled with warnings.\n');
        warn(warnings.join('\n\n'));
        warn(
          '\nSearch for the ' +
            chalk.underline(chalk.yellow('keywords')) +
            ' to learn more about each warning.'
        );

        warn(
          'To ignore, add ' +
            chalk.cyan('// eslint-disable-next-line') +
            ' to the line before.\n'
        );
      } else {
        log('Compiled successfully.\n');
      }

      log('File sizes after gzip:\n');
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        paths.appBuild,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE,
      );

      log();

      const publicUrl = paths.publicUrl;
      const publicPath = config.output.publicPath;
      const buildFolder = path.relative(process.cwd(), paths.appBuild);
      printHostingInstructions(
        appPackage,
        publicUrl,
        publicPath,
        buildFolder,
      );
    },
    (err) => {
      error('Failed to compile.\n');
      printBuildError(err ? err.stack || err.message ||  err : err);
      process.exit(1);
    },
  ).catch((err) => {
    if (err && err.message) {
      error(err ? err.stack || err.message : err);
    }

    process.exit(1);
  });

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  log('Creating an optimized production build...');

  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages;
      if (err) {
        if (!err.message) {
          return reject(err);
        }

        messages = formatWebpackMessages({
          errors: [ err.message ],
          warnings: [],
        });
      } else {
        messages = formatWebpackMessages(
          stats.toJson({ all: false, warnings: true, errors: true })
        );
      }

      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }

        return reject(new Error(messages.errors.join('\n\n')));
      } else if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        warn(
          '\nTreating warnings as errors because process.env.CI = true.\n' +
            'Most CI servers set it automatically.\n'
        );

        return reject(new Error(messages.warnings.join('\n\n')));
      }

      const resolveArgs = {
        previousFileSizes,
        stats,
        warnings: messages.warnings,
      };

      if (writeStatsJson) {
        return bfj
          .write(`${paths.appBuild}/bundle-stats.json`, stats.toJson())
          .then(() => resolve(resolveArgs))
          .catch(error => reject(new Error(error)));
      }

      return resolve(resolveArgs);
    });
  });
}

const copyPublicFolder = () => fs.copySync(paths.appPublic, paths.appBuild, {
  dereference: true,
  filter: (file) => file !== paths.fontLoaderTemplate,
});
