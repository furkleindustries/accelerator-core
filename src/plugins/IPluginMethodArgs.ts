import {
  IAcceleratorAutoplayerConfigurationNormalized,
} from '../configuration/IAcceleratorAutoplayerConfigurationNormalized';
import {
  IAcceleratorConfigAware,
} from '../interfaces/IAcceleratorConfigAware';
import {
  IAcceleratorConfigNormalized,
} from '../configuration/IAcceleratorConfigNormalized';
import {
  ILastLinkTagsAware,
} from '../interfaces/ILastLinkTagsAware';
import {
  IPassageAware,
} from '../interfaces/IPassageAware';
import {
  IPassage,
} from '../passages/IPassage';
import {
  IReduxStoreAware,
} from '../interfaces/IReduxStoreAware';
import {
  ISoundManagerAware,
} from '../interfaces/ISoundManagerAware';
import {
  IStoryStateFrame,
} from '../state/IStoryStateFrame';
import {
  IStoryStateAction,
} from '../actions/IStoryStateAction';
import {
  IStoryStateAware,
} from '../interfaces/IStoryStateAware';
import {
  MaybeReadonlyArray,
} from '../typeAliases/MaybeReadonlyArray';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../typeAliases/ReactNodeWithoutNullOrUndefined';

export interface IPluginMethodBeforeStoryLoadArgs
  extends
    IAcceleratorConfigAware,
    IReduxStoreAware,
    ISoundManagerAware
{}

export interface IPluginMethodBaseArgs
  extends 
    IAcceleratorConfigAware,
      ILastLinkTagsAware,
      IPassageAware,
      ISoundManagerAware,
      IStoryStateAware
{
  readonly autoplayerState: IAcceleratorAutoplayerConfigurationNormalized;
}

export type IPluginMethodStoryInitArgs = Omit<
  IPluginMethodBaseArgs,
  'storyState'
> & IPluginMethodStateMutationArgs;

export interface IPluginMethodChoicesArgs extends IReduxStoreAware {
  readonly choices: MaybeReadonlyArray<Element>;
}

export interface IPluginMethodChildArgs {
  readonly children: ReactNodeWithoutNullOrUndefined;
}

export interface IPluginMethodShouldRerenderArgs {
  readonly autoplayerState: IAcceleratorAutoplayerConfigurationNormalized;
  readonly config: IAcceleratorConfigNormalized;
  readonly passageObject: IPassage;
  readonly storyState: IStoryStateFrame;
}

export interface IPluginMethodStateMutationArgs extends IReduxStoreAware {
  readonly setStoryState: (
    updatedStateProps: Partial<IStoryStateFrame>,
  ) => IStoryStateAction;
}

export interface IPluginMethodStateChangingArgs {
  readonly updatedStateProps: Partial<IStoryStateFrame>;
}

export interface IPluginMethodStoryEndArgs {
  readonly passageTimeAtEnd: number;
  readonly wallTimeAtBeginning: number;
  readonly wallTimeAtEnd: number;
}
