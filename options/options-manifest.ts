/* This file was generated automatically and any changes made to it will be
 * overwritten on the next build. */

import {
  IStoryOptionManifestItem,
} from '../src/storyOptions/IStoryOptionManifestItem';

import import_0 from '../options/autoplayer/autoplayer';
import import_1 from '../options/debug/debug';
import import_2 from '../options/save-manager/save-manager';
import import_3 from '../options/sound-manager/sound-manager';

const manifest: readonly IStoryOptionManifestItem[] = [
  {
    asset: import_0,
    filepath: `options/autoplayer/autoplayer.tsx`,
  },

  {
    asset: import_1,
    filepath: `options/debug/debug.tsx`,
  },

  {
    asset: import_2,
    filepath: `options/save-manager/save-manager.tsx`,
  },

  {
    asset: import_3,
    filepath: `options/sound-manager/sound-manager.tsx`,
  },
];

export default manifest;

export const registry = {
  "autoplayer": "autoplayer",
  "debug": "debug",
  "save-manager": "save-manager",
  "sound-manager": "sound-manager"
};

/* Needed for HMR and RHL functionality with authored assets. */
if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  (module as any).hot.accept([
    '../options/autoplayer/autoplayer',
    '../options/debug/debug',
    '../options/save-manager/save-manager',
    '../options/sound-manager/sound-manager',
  ]);
}
