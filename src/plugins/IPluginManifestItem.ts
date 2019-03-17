import {
  IAssetManifestItem,
} from '../interfaces/IAssetManifestItem';
import {
  IPluginExport,
} from './IPluginExport';

export interface IPluginManifestItem extends IAssetManifestItem {
  readonly asset: IPluginExport;
}
