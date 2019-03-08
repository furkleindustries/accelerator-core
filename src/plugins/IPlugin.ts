import {
  IAsset,
} from '../interfaces/IAsset';
import {
  IPluginMethodBaseArgs,
  IPluginMethodChildArgs,
  IPluginMethodStateMutationArgs,
  IPluginMethodStateChangingArgs,
} from './IPluginMethodArgs';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../typeAliases/ReactNodeWithoutNullOrUndefined';
import {
  Omit,
} from '../typeAliases/Omit';

export interface IPlugin extends IAsset {
  afterStoryInit?(args: Omit<IPluginMethodBaseArgs, 'storyState'> & IPluginMethodStateMutationArgs): void;
  beforePassageChange?(args: IPluginMethodBaseArgs & IPluginMethodStateMutationArgs): void;
  beforeRender?(args: IPluginMethodBaseArgs & IPluginMethodChildArgs): ReactNodeWithoutNullOrUndefined;
  afterPassageChange?(args: IPluginMethodBaseArgs): void;
  afterStoryStateChange?(args: IPluginMethodBaseArgs & IPluginMethodStateChangingArgs): void;
  beforeRestart?(args: IPluginMethodBaseArgs): void;
}
