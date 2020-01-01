/* This file was generated automatically and any changes made to it will be
 * overwritten on the next build. */

import { InkMutatorsManifestItem } from '../src/mutators/InkMutatorsManifestItem';



import { TAssetRegistry } from '../src/typeAliases/TAssetRegistry';

import import_0 from '../ink-mutators/inkJsxMutator';
const manifest: readonly InkMutatorsManifestItem[] = [
  {
    asset: import_0,
    filepath: `/home/furkle/code/accelerator/accelerator-core/ink-mutators/inkJsxMutator.tsx`,
  },
];

export default manifest;

export const registry: TAssetRegistry = {"inkJsxMutator":"inkJsxMutator"}

/* Needed for HMR and RHL functionality with authored assets. */
if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  (module as any).hot.accept([
    '../ink-mutators/inkJsxMutator',
  ]);
}
