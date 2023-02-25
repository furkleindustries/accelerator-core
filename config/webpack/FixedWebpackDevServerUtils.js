import address from 'address';
import chalk from 'chalk';
import detect from 'detect-port-alt';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
import * as fs from 'fs-extra';
import getProcessForPort from 'react-dev-utils/getProcessForPort.js';
import * as inquirer from 'inquirer';
import isRoot from 'is-root';
import * as path from 'path';
import {
  paths,
} from '../paths';
import * as url from 'url';
import {
  typescriptFormatter,
} from './typescriptFormatter';

const isInteractive = process.stdout.isTTY;

const httpRe = /^http(s)?:\/\//;
const privateIpRe = /^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/;

export const prepareUrls = (protocol, host, port) => {
  const formatUrl = (hostname) => url.format({
    hostname,
    protocol,
    port,
    pathname: '/',
  });

  const prettyPrintUrl = (hostname) => url.format({
    hostname,
    protocol,
    pathname: '/',
    port: chalk.bold(String(port)),
  });

  let prettyHost;
  let lanUrlForConfig;
  let lanUrlForTerminal;
  const isUnspecifiedHost = host === '0.0.0.0' || host === '::';
  if (isUnspecifiedHost) {
    prettyHost = 'localhost';
    try {
      /* This can only return an IPv4 address. */
      lanUrlForConfig = address.ip();
      if (lanUrlForConfig) {
        /* Check if the address is a private ip
         * https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces */
        if (privateIpRe.test(lanUrlForConfig)) {
          /* Address is private, format it for later use. */
          lanUrlForTerminal = prettyPrintUrl(lanUrlForConfig);
      } else {
          /* Address is not private, so we will discard it. */
          lanUrlForConfig = undefined;
        }
      }
    } catch (err) {}
  } else {
    prettyHost = host;
  }

  const localUrlForTerminal = prettyPrintUrl(prettyHost);
  const localUrlForBrowser = formatUrl(prettyHost);
  return {
    lanUrlForConfig,
    lanUrlForTerminal,
    localUrlForTerminal,
    localUrlForBrowser,
  };
}

export const printInstructions = (appName, urls, useYarn) => {
  console.log(`\nYou can now view ${chalk.bold(appName)} in the browser.\n`);

  if (urls.lanUrlForTerminal) {
    console.log(
      `  ${chalk.bold('Local:')}            ${urls.localUrlForTerminal}\n` +
      `  ${chalk.bold('On Your Network:')}  ${urls.lanUrlForTerminal}`,
    );
  } else {
    console.log(`  ${urls.localUrlForTerminal}`);
  }

  console.log(
    '\nNote that the development build is not optimized.\n' +
    `To create a production build, use ` +
      `${chalk.cyan(`${useYarn ? 'yarn' : 'npm run'} build`)}.`,
  );
}

export const createCompiler = ({
  appName,
  config,
  devSocket,
  urls,
  useYarn,
  useTypeScript,
  webpack,
}) => {
  /* "Compiler" is a low-level interface to Webpack.
   * It lets us listen to some events and provide our own custom messages. */
  let compiler;
  try {
    compiler = webpack(config);
  } catch (err) {
    console.error(`${chalk.red('Failed to compile.')}\n${err.message || err}\n`);
    process.exit(1);
  }

  /* The "invalid" event fires when you have changed a file, and Webpack is
   * recompiling a bundle. WebpackDevServer takes care to pause serving the
   * bundle, so if you refresh, it'll wait instead of serving the old one.
   * "invalid" is short for "bundle invalidated", it doesn't imply any errors. */
  compiler.hooks.invalid.tap('invalid', () => {
    console.log('Compiling...');
  });

  let isFirstCompile = true;
  let tsMessagesPromise;
  let tsMessagesResolver;

  if (useTypeScript) {
    compiler.hooks.beforeCompile.tap('beforeCompile', () => {
      tsMessagesPromise = new Promise((resolve) => (
        tsMessagesResolver = (msgs) => resolve(msgs)
      ));
    });

    ForkTsCheckerWebpackPlugin.getCompilerHooks(compiler).receive.tap(
      'afterTypeScriptCheck',
      (diagnostics, lints) => {
        const allMsgs = [
          ...diagnostics,
          ...lints,
        ];

        const format = (message) => (
          `${message.file}\n${typescriptFormatter(message, true)}`
        );

        const errors = allMsgs
          .filter((msg) => msg.severity === 'error')
          .map((msg) => format(msg));

        const warnings = allMsgs
          .filter((msg) => msg.severity === 'warning')
          .map((msg) => format(msg));

        tsMessagesResolver({
          errors,
          warnings,
        });
      },
    );
  }

  /* The "done" event fires when Webpack has finished recompiling the bundle.
   * You will get this event regardless of whether any warnings or errors were
   * produced. */
  compiler.hooks.done.tap('done', async (stats) => {
    /* We have switched off the default Webpack output in WebpackDevServer
     * options so we are going to "massage" the warnings and errors and present
     * them in a readable focused way.
     * We only construct the warnings and errors for speed:
     * https://github.com/facebook/create-react-app/issues/4492#issuecomment-421959548 */
    const statsData = stats.toJson({
      all: false,
      errors: true,
      warnings: true,
    });

    if (useTypeScript && statsData.errors.length === 0) {
      const delayedMsg = setTimeout(() => console.log(
        chalk.green(
          'Files successfully emitted, waiting for typecheck results...'
        )
      ), 100);

      const messages = await tsMessagesPromise;
      clearTimeout(delayedMsg);
      statsData.errors.push(...messages.errors);
      statsData.warnings.push(...messages.warnings);

      /* Push errors and warnings into compilation result
       * to show them after page refresh triggered by user. */
      stats.compilation.errors.push(...messages.errors);
      stats.compilation.warnings.push(...messages.warnings);

      if (messages.errors.length > 0) {
        devSocket.errors(messages.errors);
      } else if (messages.warnings.length > 0) {
        devSocket.warnings(messages.warnings);
      }
    }

    const messages = formatWebpackMessages(statsData);
    const isSuccessful = !messages.errors.length && !messages.warnings.length;

    if (isSuccessful) {
      console.log(chalk.green('Compiled successfully!'));
    }

    if (isSuccessful && (isInteractive || isFirstCompile)) {
      printInstructions(appName, urls, useYarn);
    }

    isFirstCompile = false;

    /* If errors exist, only show errors. */
    if (messages.errors.length) {
      console.log(chalk.red(
        `Failed to compile.\n\n${messages.errors.join('\n\n')}`,
      ));

      return;
    }

    /* Show warnings if no errors were found. */
    if (messages.warnings.length) {
      console.log(
        `${chalk.yellow('Compiled with warnings.\n')}\n` +
          `${messages.warnings.join('\n\n')}\n\n` +
          /* Teach some ESLint tricks. */
          `Search for the ${chalk.underline(chalk.yellow('keywords'))} to ` +
          `learn more about each warning.\n To ignore, add ` +
          `${chalk.cyan('// eslint-disable-next-line ')} to the line ` +
          `directly above the line which produced an error. ` +
          `This will remove all errors for the next line. Adding one or more ` +
          `rules after a space will ignore only those rules. \nAlternately, ` +
          `you may permanently remove the rule in the "rules" property ` +
          `within the configuration file at ${chalk.bold(paths.eslintConfig)}.`,
      );
    }
  });

  return compiler;
}

export function resolveLoopback(proxy) {
  const o = url.parse(proxy);
  o.host = undefined;
  if (o.hostname !== 'localhost') {
    return proxy;
  }

  /* Unfortunately, many languages (unlike node) do not yet support IPv6.
   * This means even though localhost resolves to ::1, the application
   * must fall back to IPv4 (on 127.0.0.1).
   * We can re-enable this in a few years.
  try {
    o.hostname = address.ipv6() ? '::1' : '127.0.0.1';
  } catch (_ignored) {
    o.hostname = '127.0.0.1';
  }*/

  try {
    /* Check if we're on a network; if we are, chances are we can resolve
     * localhost. Otherwise, we can just be safe and assume localhost is
     * IPv4 for maximum compatibility. */
    if (!address.ip()) {
      o.hostname = '127.0.0.1';
    }
  } catch (err) {
    o.hostname = '127.0.0.1';
  }

  return url.format(o);
}

/* We need to provide a custom onError function for httpProxyMiddleware.
 * It allows us to log custom error messages on the (??? - venus wormwood) */ 
const onProxyError = (proxy) => {
  return (err, req, res) => {
    const host = req.headers && req.headers.host;
    console.error(
      `Proxy error: Could not proxy request ` +
        `${chalk.bold(chalk.cyan(req.url))} ${chalk.bold(chalk.cyan(host))} to ` +
        `${chalk.bold(chalk.cyan(proxy))}.\n` +
        'See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (' +
          chalk.cyan(err.code) +
        ').\n'
    );

    /* Immediately send the proper error response to the client.
     * Otherwise, the request will eventually timeout with ERR_EMPTY_RESPONSE
     * on the client side. */
    if (res.writeHead && !res.headersSent) {
      res.writeHead(500);
    }

    res.end(
      `Proxy error: Could not proxy request ${req.url} from ${host} to ` +
        `${proxy} (error code ${err.code || 'unknown'}).`,
    );
  };
}

export const prepareProxy = (proxy, appPublicFolder) => {
  /* "proxy" lets you specify alternate servers for specific requests. */
  if (!proxy) {
    return undefined;
  }

  if (typeof proxy !== 'string') {
    console.error(
      `When specified, "proxy" in package.json must be a string.'\n` +
        `Instead, the type of "proxy" was "${typeof proxy}".`,
    );

    process.exit(1);
  }

  /* If "proxy" is specified, let it handle any request except for files in the
   * public folder. */
  const mayProxy = (pathname) => {
    const maybePublicPath = path.resolve(appPublicFolder, pathname.slice(1));
    return !fs.existsSync(maybePublicPath);
  }

  if (!httpRe.test(proxy)) {
    console.error(
      'When "proxy" is specified in package.json it must start with either ' +
        `${chalk.bold('http://')} or ${chalk.bold('https://')}.`,
    );

    process.exit(1);
  }

  let target;
  if (process.platform === 'win32') {
    target = resolveLoopback(proxy);
  } else {
    target = proxy;
  }

  return [
    {
      target,
      changeOrigin: true,
      logLevel: 'silent',

      // For single page apps, we generally want to fallback to /index.html.
      // However we also want to respect `proxy` for API calls.
      // So if `proxy` is specified as a string, we need to decide which fallback to use.
      // We use a heuristic: We want to proxy all the requests that are not meant
      // for static assets and as all the requests for static assets will be using
      // `GET` method, we can proxy all non-`GET` requests.
      // For `GET` requests, if request `accept`s text/html, we pick /index.html.
      // Modern browsers include text/html into `accept` header when navigating.
      // However API calls like `fetch()` won't generally accept text/html.
      // If this heuristic doesn't work well for you, use `src/setupProxy.js`.
      context: (pathname, req) => {
        return (
          req.method !== 'GET' ||
          (mayProxy(pathname) &&
            req.headers.accept &&
            req.headers.accept.indexOf('text/html') === -1)
        );
      },

      onError: onProxyError(target),
      onProxyReq: (proxyReq) => {
        // Browsers may send Origin headers even with same-origin
        // requests. To prevent CORS issues, we have to change
        // the Origin to match the target URL.
        if (proxyReq.getHeader('origin')) {
          proxyReq.setHeader('origin', target);
        }
      },

      secure: false,
      ws: true,
      xfwd: true,
    },
  ];
}

export const choosePort = (host, defaultPort) => {
  return detect(defaultPort, host).then(
    (port) => new Promise(resolve => {
      if (port === defaultPort) {
        return resolve(port);
      }
      const message =
        process.platform !== 'win32' && defaultPort < 1024 && !isRoot() ?
          `Admin permissions are required to run a server on a port below 1024.` :
          `Something is already running on port ${defaultPort}.`;

      if (isInteractive) {
        const existingProcess = getProcessForPort(defaultPort);
        const question = {
          default: true,
          name: 'shouldChangePort',
          message: chalk.yellow(
            `${message}` +
            `${existingProcess ? ` Probably:\n  ${existingProcess}` : ''}`
          ) + '\n\nWould you like to run the app on another port instead?',
          
          type: 'confirm',
        };

        inquirer.prompt(question).then((answer) => {
          if (answer.shouldChangePort) {
            resolve(port);
          } else {
            resolve(null);
          }
        });
      } else {
        console.log(chalk.red(message));
        resolve(null);
      }
    }),

    (err) => {
      throw new Error(
        `${chalk.red(`Could not find an open port at ${chalk.bold(host)}.`)}\n` +
          `Network error message: ${err.message || err}\n` +
          '\n'
      );
    },
  );
};
