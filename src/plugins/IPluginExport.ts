import {
  IAsset,
} from '../interfaces/IAsset';
import {
  IPlugin,
} from './IPlugin';
import {
  IPrecedenceWeighted,
} from '../interfaces/IPrecedenceWeighted';

import {
  registry,
} from '../../plugins/plugins-manifest';

type RegistryType = typeof registry;

export type PluginNames = keyof RegistryType;

export interface IPluginExport extends IAsset, IPrecedenceWeighted {
  readonly content?: IPlugin;
  readonly name: PluginNames;
}
