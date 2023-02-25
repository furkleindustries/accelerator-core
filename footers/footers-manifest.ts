/* This file was generated automatically and any changes made to it will be
 * overwritten on the next build. */

import {
  IFooterManifestItem,
} from '../src/passages/IFooterManifestItem';

import import_0 from '../footers/noise-sound/noise-sound';

const manifest: readonly IFooterManifestItem[] = [
  {
    asset: import_0,
    filepath: `footers/noise-sound/noise-sound.tsx`,
  },
];

export default manifest;

export const registry = {
  "noise-sound": "noise-sound"
};

/* Needed for HMR and RHL functionality with authored assets. */
if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  (module as any).hot.accept([
    '../footers/noise-sound/noise-sound',
  ]);
}
