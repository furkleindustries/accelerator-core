import {
  IPlugin,
} from '../plugins/IPlugin';

export interface IPluginsContext {
  readonly plugins: ReadonlyArray<IPlugin>;
}
