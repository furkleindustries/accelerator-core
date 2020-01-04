import {
  ILastLinkTagsAware,
} from '../interfaces/ILastLinkTagsAware';
import {
  IPassage,
} from '../passages/IPassage';
import {
  IState,
} from '../state/IState';
import {
  IStoryStateFrame,
} from '../state/IStoryStateFrame';
import {
  IStoryStateAction,
} from '../actions/IStoryStateAction';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../typeAliases/ReactNodeWithoutNullOrUndefined';
import {
  Store,
} from 'redux';

export interface IPluginMethodBaseArgs extends ILastLinkTagsAware {
  readonly passageObject: IPassage;
  readonly storyState: IStoryStateFrame;
}

export interface IPluginMethodChildArgs {
  readonly children: ReactNodeWithoutNullOrUndefined;
}

export interface IPluginMethodStateMutationArgs {
  readonly store: Store<IState>;
  readonly setStoryState: (
    updatedStateProps: Partial<IStoryStateFrame>,
  ) => IStoryStateAction;
}

export interface IPluginMethodStateChangingArgs {
  readonly updatedStateProps: Partial<IStoryStateFrame>;
}
