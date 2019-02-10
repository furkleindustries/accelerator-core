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
  Tag,
} from '../tags/Tag';
import {
  ReactNode,
} from 'react';
import {
  Store,
} from 'redux';

export interface IPluginMethodBaseArgs {
  readonly passageObject: IPassage;
  readonly storyState: IStoryStateFrame;
  readonly lastLinkTags: Readonly<Tag[]>;
}

export interface IPluginMethodChildArgs {
  readonly children: ReactNode;
}

export interface IPluginMethodStateMutationArgs {
  readonly store: Store<IState>;
  setStoryState(updatedStateProps: Partial<IStoryStateFrame>): IStoryStateAction;
}

export interface IPluginMethodStateChangingArgs {
  readonly updatedStateProps: Partial<IStoryStateFrame>;
}
