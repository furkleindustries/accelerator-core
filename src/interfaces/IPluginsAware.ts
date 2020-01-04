import {
  IPlugin,
} from '../plugins/IPlugin';
import {
  MaybeReadonlyArray,
} from '../typeAliases/MaybeReadonlyArray';

export interface IPluginsAware {
  readonly plugins: MaybeReadonlyArray<IPlugin>;
}
