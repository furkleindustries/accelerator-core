import {
  IPassage,
} from '../passages/IPassage';
import {
  IState,
} from '../reducers/IState';
import {
  IStoryStateInstance,
} from '../state/IStoryStateInstance';
import {
  IStoryStateUpdateAction,
} from '../actions/IStoryStateUpdateAction';
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
  currentPassageObject: IPassage;
  currentStoryState: IStoryStateInstance;
  lastLinkTags: Readonly<Tag[]>;
}

export interface IPluginMethodChildArgs {
  children: ReactNode;
}

export interface IPluginMethodStateMutationArgs {
  store: Store<IState>;
  setStoryState(updatedStateProps: Partial<IStoryStateInstance>): IStoryStateUpdateAction;
}

export interface IPluginMethodStateChangingArgs {
  updatedStateProps: Partial<IStoryStateInstance>;
}
