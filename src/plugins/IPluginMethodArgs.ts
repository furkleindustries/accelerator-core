import {
  IPassage,
} from '../passages/IPassage';
import {
  IState,
} from '../state/IState';
import {
  IStoryStateInstance,
} from '../state/IStoryStateInstance';
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
  readonly currentPassageObject: IPassage;
  readonly storyState: IStoryStateInstance;
  readonly lastLinkTags: Readonly<Tag[]>;
}

export interface IPluginMethodChildArgs {
  readonly children: ReactNode;
}

export interface IPluginMethodStateMutationArgs {
  readonly store: Store<IState>;
  setStoryState(updatedStateProps: Partial<IStoryStateInstance>): IStoryStateAction;
}

export interface IPluginMethodStateChangingArgs {
  readonly updatedStateProps: Partial<IStoryStateInstance>;
}
