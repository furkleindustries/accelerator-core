import {
  IPluginMethodBaseArgs,
  IPluginMethodChildArgs,
  IPluginMethodStateMutationArgs,
  IPluginMethodStateChangingArgs,
} from './IPluginMethodArgs';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IPlugin {
  afterStoryInit?(args: IPluginMethodBaseArgs & IPluginMethodStateMutationArgs): void;
  beforePassageChange?(args: IPluginMethodBaseArgs & IPluginMethodStateMutationArgs): void;
  beforeRender?(args: IPluginMethodBaseArgs & IPluginMethodChildArgs): ReactNodeWithoutNullOrUndefined;
  afterPassageChange?(args: IPluginMethodBaseArgs): void;
  afterStoryStateChange?(args: IPluginMethodBaseArgs & IPluginMethodStateChangingArgs): void;
  beforeRestart?(args: IPluginMethodBaseArgs): void;
}
