import {
  IAssetManifestItem,
} from '../interfaces/IAssetManifestItem';
import {
  IFooter,
} from './IFooter';

export interface IFooterManifestItem extends IAssetManifestItem {
  readonly asset: IFooter;
}
