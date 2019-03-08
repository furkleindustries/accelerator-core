import {
  IAssetManifestItem,
} from '../interfaces/IAssetManifestItem';
import {
  IStoryOption,
} from './IStoryOption';

export interface IStoryOptionManifestItem extends IAssetManifestItem {
  readonly asset: IStoryOption;
}
