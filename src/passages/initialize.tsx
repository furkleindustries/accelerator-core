import {
  clearLoadingScreen,
} from './clearLoadingScreen';
import {
  warn,
} from 'colorful-logging';
import {
  InitializationHandler,
} from './InitializationHandler';
import {
  InitializationHandlerOptions,
} from './InitializationHandlerOptions';

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
      /* This could be an error for codebases in which initialization is
       * strictly necessary, but it's being left as a warning by default given
       * that many people won't need or want initializing logic, and might end
       * up deleting the file for that reason. */
      warn('The initialization function could not be found.');
      clearLoadingScreen(appSelector, loadSelector);
      return;
    }
  }

  if (typeof init! !== 'function') {
    warn('The initialization default export was not a function.');
    clearLoadingScreen(appSelector, loadSelector);
    return;
  }

  /* This is deliberately uncaught with regards to errors. If you have
   * initializing logic, you either need to make it resolve without errors,
   * or you need to catch the rejections. */
  await init(new InitializationHandler({
    appSelector,
    config,
    loadSelector,
  }));
}
