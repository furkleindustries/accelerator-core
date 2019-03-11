/* This file was generated automatically and any changes made to it will be
 * overwritten on the next build. */
import { IStoryOptionManifestItem } from '../src/storyOptions/IStoryOptionManifestItem';

import import_0 from '../options/sound-manager/sound-manager';

const manifest: ReadonlyArray<IStoryOptionManifestItem> = [
  {
    asset: import_0,
    filepath: `C:/Users/furkle/Documents/code/accelerator/accelerator-core/options/sound-manager/sound-manager.tsx`,
  },
];

export default manifest;

/* Needed for HMR and RHL functionality with authored assets. */
if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  (module as any).hot.accept([
    '../options/sound-manager/sound-manager',
  ]);
}
