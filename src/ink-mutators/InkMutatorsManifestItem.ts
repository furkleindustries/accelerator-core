import {
  IAssetManifestItem,
} from '../interfaces/IAssetManifestItem';
import {
  InkMutatorObject,
} from './InkMutatorObject';

export interface InkMutatorsManifestItem extends IAssetManifestItem {
  readonly asset: InkMutatorObject;
}