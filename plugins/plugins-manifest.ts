/* This file was generated automatically and any changes made to it will be
 * overwritten on the next build. */

import {
  IPluginManifestItem,
} from '../src/plugins/IPluginManifestItem';

import import_0 from '../plugins/autoplayer/autoplayer';
import import_1 from '../plugins/debug/debug';
import import_2 from '../plugins/media-preloader/media-preloader';
import import_3 from '../plugins/menu/menu';
import import_4 from '../plugins/noise-css-properties/noise-css-properties';
import import_5 from '../plugins/save-manager/save-manager';

const manifest: readonly IPluginManifestItem[] = [
  {
    asset: import_0,
    filepath: `plugins/autoplayer/autoplayer.tsx`,
  },

  {
    asset: import_1,
    filepath: `plugins/debug/debug.tsx`,
  },

  {
    asset: import_2,
    filepath: `plugins/media-preloader/media-preloader.tsx`,
  },

  {
    asset: import_3,
    filepath: `plugins/menu/menu.tsx`,
  },

  {
    asset: import_4,
    filepath: `plugins/noise-css-properties/noise-css-properties.tsx`,
  },

  {
    asset: import_5,
    filepath: `plugins/save-manager/save-manager.tsx`,
  },
];

export default manifest;

export const registry = {
  "autoplayer": "autoplayer",
  "debug": "debug",
  "media-preloader": "media-preloader",
  "menu": "menu",
  "noise-css-properties": "noise-css-properties",
  "save-manager": "save-manager"
};

/* Needed for HMR and RHL functionality with authored assets. */
if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  (module as any).hot.accept([
    '../plugins/autoplayer/autoplayer',
    '../plugins/debug/debug',
    '../plugins/media-preloader/media-preloader',
    '../plugins/menu/menu',
    '../plugins/noise-css-properties/noise-css-properties',
    '../plugins/save-manager/save-manager',
  ]);
}
