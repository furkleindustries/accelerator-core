import {
  IAssetManifestItem,
} from '../interfaces/IAssetManifestItem';
import {
  IPassage,
} from './IPassage';

export interface IPassageManifestItem extends IAssetManifestItem {
  readonly asset: IPassage;
}
