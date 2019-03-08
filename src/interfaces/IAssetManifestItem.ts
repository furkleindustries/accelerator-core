import {
  IAsset,
} from './IAsset';

export interface IAssetManifestItem {
  readonly asset: IAsset;
  readonly filepath: string;
}
