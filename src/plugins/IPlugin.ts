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
  readonly afterStoryInit?: (
    args: Omit<IPluginMethodBaseArgs, 'storyState'> &
      IPluginMethodStateMutationArgs
  ) => void;

  readonly beforePassageChange?: (
    args: IPluginMethodBaseArgs & IPluginMethodStateMutationArgs,
  ) => void;

  readonly beforeRender?: (
    args: IPluginMethodBaseArgs & IPluginMethodChildArgs
  ) => ReactNodeWithoutNullOrUndefined;

  readonly afterPassageChange?: (args: IPluginMethodBaseArgs) => void;
  readonly afterStoryStateChange?: (
    args: IPluginMethodBaseArgs & IPluginMethodStateChangingArgs,
  ) => void;

  readonly beforeRestart?: (args: IPluginMethodBaseArgs) => void;
}
