import {
  InitializationHandler,
} from './InitializationHandler';

export async function initialize() {
  let init: (args: InitializationHandler) => Promise<void>;
  try {
    init = require('../../passages/_initialization');
  } catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      throw err;
    }
  }

  if (typeof init! !== 'function') {
    return;
  }

  await init(new InitializationHandler());
}
