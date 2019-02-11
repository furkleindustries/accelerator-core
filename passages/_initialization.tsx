import { InitializationOptions } from '../src/passages/InitializationOptions';

/* This file is used for any logic which must execute before the story begins
 * every time it is loaded. This includes loading story saves. Do not use this
 * passage for logic which should only be executed on the start passage. */
export default async function initialization(initOptions: InitializationOptions) {
  initOptions.beginLoad();
}
