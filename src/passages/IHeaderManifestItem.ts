import {
  IAssetManifestItem,
} from '../interfaces/IAssetManifestItem';
import {
  IHeader,
} from './IHeader';

export interface IHeaderManifestItem extends IAssetManifestItem {
  readonly asset: IHeader;
}
