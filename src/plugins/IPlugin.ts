import {
  IPluginMethodBaseArgs,
  IPluginMethodChildArgs,
  IPluginMethodStateMutationArgs,
  IPluginMethodStateChangingArgs,
} from './IPluginMethodArgs';
import {
  ITaggable,
} from '../interfaces/ITaggable';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../typeAliases/ReactNodeWithoutNullOrUndefined';
import {
  Omit,
} from '../typeAliases/Omit';

export interface IPlugin extends ITaggable {
  afterStoryInit?(args: Omit<IPluginMethodBaseArgs, 'storyState'> & IPluginMethodStateMutationArgs): void;
  beforePassageChange?(args: IPluginMethodBaseArgs & IPluginMethodStateMutationArgs): void;
  beforeRender?(args: IPluginMethodBaseArgs & IPluginMethodChildArgs): ReactNodeWithoutNullOrUndefined;
  afterPassageChange?(args: IPluginMethodBaseArgs): void;
  afterStoryStateChange?(args: IPluginMethodBaseArgs & IPluginMethodStateChangingArgs): void;
  beforeRestart?(args: IPluginMethodBaseArgs): void;
}
