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

export interface IPluginMethodArgs {
  currentPassageObject: IPassage;
  currentStoryState: IStoryStateInstance;
  lastLinkTags: Readonly<Tag[]>;
}

export interface IPluginArgsWithChildren {
  children: ReactNode;
}

export interface IPluginArgsWithState {
  store: Store<IState>;
  setStoryState(newState: Partial<IStoryStateInstance>): IStoryStateUpdateAction;
}

export default IPluginMethodArgs;
