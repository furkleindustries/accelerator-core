import {
  IAction,
} from '../actions/IAction';
import {
  HistoryFilter,
} from '../reducers/IHistoryFilter';
import {
  IPassage,
} from './IPassage';
import {
  IStoryStateFrame,
} from '../state/IStoryStateFrame';
import {
  Dispatch,
} from 'redux';
import {
  Tag,
} from '../tags/Tag';

export interface IPassageProps {
  dispatch: Dispatch<IAction>;
  lastLinkTags: Readonly<Tag[]>;
  passageObject: IPassage;
  storyState: IStoryStateFrame;
  bookmark(): void;
  navigateTo(passageName: string, tags?: Readonly<Tag[]>): void;
  restart(): void;
  rewind(filter?: HistoryFilter): void;
  setStoryState(updatedStateProps: Partial<IStoryStateFrame>): void;
}
