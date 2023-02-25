import {
  clearLoadingScreen,
} from './clearLoadingScreen';
import {
  InitializationHandler,
} from './InitializationHandler';
import {
  InitializationHandlerOptions,
} from './InitializationHandlerOptions';

export const initialize = async ({
  appDocumentSelector,
  config,
  config: {
    loggers: { warn },
  },

  fadeOutDuration,
  imagesToPreload,
  loadDocumentSelector,
  soundGroups,
  soundManager,
  store,
}: InitializationHandlerOptions) => {
  let init: <T extends InitializationHandler>(args: T) => Promise<void>;
  try {
    init = (await import('../../passages/_initialization')).default;
  } catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      throw err;
    } else {
      /* This could be an error for codebases in which initialization is
       * strictly necessary, but it's being left as a warning by default given
       * that many people won't need or want initializing logic, and might end
       * up deleting the file for that reason. */
      warn('The initialization function could not be found.');
      clearLoadingScreen(appDocumentSelector, loadDocumentSelector);
      return;
    }
  }

  if (typeof init! !== 'function') {
    warn('The _initialization.tsx default export was not a function.');
    clearLoadingScreen(appDocumentSelector, loadDocumentSelector);
    return;
  }

  /* This is deliberately uncaught with regards to errors. If you have
   * initializing logic, you either need to make it resolve without errors,
   * or you need to catch the rejections. */
  try {
    return init(new InitializationHandler({
      appDocumentSelector,
      config,
      imagesToPreload,
      fadeOutDuration,
      loadDocumentSelector,
      soundGroups,
      soundManager,
      store,
    }));
  } catch (err) {
    throw new Error(err);
  }
};
