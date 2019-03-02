import {
  IAction,
} from '../actions/IAction';
import {
  HistoryFilter,
} from '../reducers/IHistoryFilter';
import {
  IManager,
} from 'sound-manager';
import {
  IPassage,
} from './IPassage';
import {
  IStoryStateFrame,
} from '../state/IStoryStateFrame';
import {
  Ref,
} from 'react';
import {
  Dispatch,
} from 'redux';
import {
  Tag,
} from '../tags/Tag';

export interface IPassageProps {
  readonly dispatch: Dispatch<IAction>;
  readonly lastLinkTags: Readonly<Tag[]>;
  readonly passageObject: IPassage;
  readonly soundManager: IManager;
  readonly storyState: IStoryStateFrame;
  readonly ref?: Ref<Element>;
  bookmark(): void;
  navigateTo(passageName: string, tags?: Readonly<Tag[]>): void;
  restart(): void;
  rewind(filter?: HistoryFilter): void;
  setStoryState(updatedStateProps: Partial<IStoryStateFrame>): void;
}
