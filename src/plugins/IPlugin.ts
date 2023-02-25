import {
  IPluginMethodBaseArgs,
  IPluginMethodBeforeStoryLoadArgs,
  IPluginMethodChildArgs,
  IPluginMethodChoicesArgs,
  IPluginMethodShouldRerenderArgs,
  IPluginMethodStoryInitArgs,
  IPluginMethodStateChangingArgs,
  IPluginMethodStateMutationArgs,
  IPluginMethodStoryEndArgs,
} from './IPluginMethodArgs';
import type {
  ReactElement,
} from 'react';

export interface IPlugin {
  readonly beforeStoryLoad?: (
    args: IPluginMethodBeforeStoryLoadArgs,
  ) => Promise<void>;

  readonly afterStoryInit?: (
    args: IPluginMethodStoryInitArgs,
  ) => void;

  readonly beforePassageChange?: (
    args: IPluginMethodBaseArgs & IPluginMethodStateMutationArgs,
  ) => void;

  readonly beforeRender?: (
    args: IPluginMethodBaseArgs & IPluginMethodChildArgs,
  ) => ReactElement;

  readonly shouldRerender?: (
    args: IPluginMethodShouldRerenderArgs,
  ) => boolean;

  readonly afterPassageChange?: (
    args: IPluginMethodBaseArgs & IPluginMethodStateMutationArgs,
  ) => void;

  readonly onAvailableChoices?: (
    args: IPluginMethodBaseArgs & IPluginMethodChoicesArgs,
  ) => void;

  readonly afterStoryStateChange?: (
    args: IPluginMethodBaseArgs & IPluginMethodStateChangingArgs,
  ) => void;

  readonly beforeRestart?: (args: IPluginMethodBaseArgs) => void;

  readonly beforeStoryEnd?: (
    args: IPluginMethodBaseArgs & IPluginMethodStoryEndArgs,
  ) => void;
}
