import {
  IAsset,
} from '../interfaces/IAsset';
import {
  IPlugin,
} from './IPlugin';
import {
  IPrecedenceWeighted,
} from '../interfaces/IPrecedenceWeighted';

export interface IPluginExport extends IAsset, IPrecedenceWeighted {
  readonly content?: IPlugin;
}
