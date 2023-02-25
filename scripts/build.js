import './functions/setUnhandledRejectionEvent';
import '../config/setProductionEnv';

import slash from 'slash';
import webpack from 'webpack';

/* Ensure the library is built in production. */
process.env.NODE_ENV = 'production';

(async () => {
  const [
    // ../accelerator.config
    { default: acceleratorConfig },

    // bfj
    bfj,
  
    // react-dev-utils/browsersHelper
    { checkBrowsers },

    // chalk
    { default: chalk },

    // ./functions/generateWebAppManifest
    { generateWebAppManifest },
  
    // react-dev-utils/formatWebpackMessages
    { default: formatWebpackMessages },

    // fs-extra
    {
      pathExistsSync,
      writeFile,
    },

    // path
    path,

    // ../config/paths
    { paths },

    // ./functions/warnIfDeveloperOptionsEnabled
    { warnIfDeveloperOptionsEnabled: warnIfDeveloperOptionsEnabledFunc },

    // ../config/webpack/webpack.config
    { default: webpackConfig },
  ] = (await Promise.all([
    import('../accelerator.config'),
    import('bfj'),
    import('react-dev-utils/browsersHelper'),
    import('chalk'),
    import('./functions/generateWebAppManifest'),
    import('react-dev-utils/formatWebpackMessages'),
    import('fs-extra'),
    import('path'),
    import('../config/paths'),
    import('./functions/warnIfDeveloperOptionsEnabled'),
    import('../config/webpack/webpack.config'),
  ]));
  
  const {
    argv,
    env: { CI },
    exit,
    stdout: { isTTY },
  } = process;

  try {
    // Warn and crash if required files are missing
    if (!pathExistsSync(paths.appIndex)) {
      exit(1);
    }

    let foundWarnings = false;
    if (acceleratorConfig.warnIfDeveloperOptionsEnabled) {
      foundWarnings = warnIfDeveloperOptionsEnabledFunc(acceleratorConfig);
    }

    // Process CLI arguments
    const writeStatsJson = argv.slice(2).indexOf('--stats') !== -1;

    // We require that you explicitly set browsers and do not fall back to
    // browserslist defaults.
    await checkBrowsers(paths.appPath, isTTY);

    console.log(chalk.green('Creating an optimized production build...\n'));

    // Start the webpack build
    const compiler = webpack(webpackConfig);
    compiler.run((err, stats) => {
      console.log('Bundling has completed.\n');

      let messages = {
        errors: [],
        warnings: [],
      };

      if (err) {
        if (!err.message) {
          console.error(chalk.red(err.toString()));
          exit(1);
        }

        messages = formatWebpackMessages({
          errors: [ err.message ],
          warnings: [],
        });
      } else {
        const jsonStats = stats.toJson({
          all: false,
          errors: true,
          warnings: true,
        });

        messages = formatWebpackMessages(jsonStats);
      }

      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        console.error(chalk.red(messages.errors[0].toString()));
        exit(1);
      } else if (CI &&
        (typeof CI !== 'string' ||
          CI.toLowerCase() !== 'false') &&
        messages.warnings.length)
      {
        console.warn(chalk.yellow(
          '\nTreating warnings as errors because process.env.CI = true.\n' +
            'Most CI servers set it automatically.\n'
        ));

        console.error(chalk.yellow(messages.warnings.join('\n\n')));
        exit(1);
      }

      if (writeStatsJson) {
        console.log('Generating statistics for output bundle.');

        bfj.write(
          `${paths.appBuild}/bundle-stats.json`,
          stats.toJson(),
        );
      }

      console.log('Generating web app manifest.\n');

      const webAppManifest = generateWebAppManifest();
      const outPath = path.join(paths.appBuild, 'manifest.json');
      const manifestStr = JSON.stringify(webAppManifest, null, 4);

      Promise.all([
        writeFile(outPath, manifestStr),
        writeFile(path.join(paths.appPublic, 'manifest.json'), manifestStr),
      ]).then(
        () => {
          if (messages.warnings.length) {
            console.warn(chalk.yellow(messages.warnings.join('\n\n')));
            console.warn(chalk.yellow(
              `\nSearch for the ${chalk.underline('keywords')} to learn more about each warning.`,
            ));
    
            console.warn(chalk.yellow(
              `To ignore, add ${chalk.underline('// eslint-disable-next-line')} to the line before.\n`,
            ));

            foundWarnings = true;
          }
    
          const publicUrl = acceleratorConfig.publicUrl;
          const buildFolder = paths.appBuild.endsWith('/') ?
            paths.appBuild :
            `${paths.appBuild}/`;

          if (foundWarnings) {
            console.warn(chalk.yellow(
              `The Accelerator build process completed, but encountered warnings. ` +
                `Please be sure to scroll up and inspect each warning.\n`,
            ));
          } else {
            console.log(chalk.green(
              `The Accelerator build process is now complete.\n`,
            ));
          }

          console.log(
            `All generated files are in the following folder: ` +
              `${chalk.underline(
                slash(
                  buildFolder.startsWith('C:') ?
                    `/${buildFolder.slice(3)}` :
                    buildFolder,
                ),
              )}\n` +
              `\n` +

              `The contents of the ${chalk.underline(path.basename(buildFolder))} folder should be hosted at ${chalk.underline(publicUrl)}.\n\n` +
              `These files may be served with the ${chalk.underline('http')} or ${chalk.underline('https')} servers built into Node.js, ` +
              `or by installing a separate server library like ${chalk.underline('express')} or ${chalk.underline('serve')}. ` +
              `Alternately, all folder contents may be uploaded to any static site hosting, like GitHub Pages.\n`
          );
        },

        (err) => {
          console.error(chalk.red('The Accelerator build failed with the following error:\n'));
          console.error(chalk.red((err ? err.stack || err.message || err : err).toString()));
          exit(1);
        },
      );
    });
  } catch (err) {
    console.error(chalk.red('The Accelerator build failed with the following error:\n'));
    console.error(chalk.red((err ? err.stack || err.message || err : err).toString()));
    exit(1);
  }
})();
