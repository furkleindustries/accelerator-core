import {
  clearLoadingScreen,
} from './clearLoadingScreen';
import {
  warn,
} from 'colorful-logging';
import {
  InitializationHandler,
} from './InitializationHandler';
import { InitializationHandlerOptions } from './InitializationHandlerOptions';

export async function initialize({
  appSelector,
  config,
  loadSelector,
}: InitializationHandlerOptions) {
  let init: <T extends InitializationHandler>(args: T) => Promise<void>;
  try {
    init = require('../../passages/_initialization').default;
  } catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      throw err;
    } else {
      warn('The initialization passage could not be found.');
      clearLoadingScreen(appSelector, loadSelector);
      return;
    }
  }

  if (typeof init! !== 'function') {
    warn('The initialization passage was not ');
    clearLoadingScreen(appSelector, loadSelector);
    return;
  }

  await init(new InitializationHandler({
    appSelector,
    config,
    loadSelector,
  }));
}
