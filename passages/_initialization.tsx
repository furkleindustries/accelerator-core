import { IBeginLoadOptions } from '../src/passages/IBeginLoadOptions';
import { InitializationHandler } from '../src/passages/InitializationHandler';

/* This file is used for any logic which must execute before the story begins
 * every time it is loaded. This includes loading story saves. Do not use this
 * passage for logic which should only be executed on the start passage. */
export default async function initialization(handler: InitializationHandler) {
  /* Call any of the function arguments besides beginLoad here. Any calls to
   * other functions will be disregarded after beginLoad is called. */

  // opts.setProgressMax(10);
  // opts.setProgressStart(1);
  // opts.

  /* beginLoad *must* be called, otherwise the story will never load. Do not
   * delete this call, but feel free to pass any of the optional arguments to
   * it. */

  const opts: IBeginLoadOptions = {
    // bodyText: 'cool body text',
    // component: MyLoadingScreen,
    // doneCallback: () => doThing();
    // logoPath: '../../public/cool-logo.svg',
    // progressMax: 15,
    // progressStart: 2,
    // title: 'Loading...',
  };

  handler.beginLoad(opts);
}
