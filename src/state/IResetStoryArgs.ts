import {
  IPlugin,
} from '../plugins/IPlugin';
import {
  IPluginMethodBaseArgs,
} from '../plugins/IPluginMethodArgs';
import {
  IReduxStoreAware,
} from '../interfaces/IReduxStoreAware';

export interface IResetStoryArgs extends IPluginMethodBaseArgs, IReduxStoreAware {
  readonly plugins: readonly IPlugin[];
}
