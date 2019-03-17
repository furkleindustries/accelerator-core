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
import {
  Tag,
} from '../tags/Tag';

export interface IPluginMethodBaseArgs {
  readonly passageObject: IPassage;
  readonly storyState: IStoryStateFrame;
  readonly lastLinkTags: ReadonlyArray<Tag>;
}

export interface IPluginMethodChildArgs {
  readonly children: ReactNodeWithoutNullOrUndefined;
}

export interface IPluginMethodStateMutationArgs {
  readonly store: Store<IState>;
  setStoryState(updatedStateProps: Partial<IStoryStateFrame>): IStoryStateAction;
}

export interface IPluginMethodStateChangingArgs {
  readonly updatedStateProps: Partial<IStoryStateFrame>;
}
