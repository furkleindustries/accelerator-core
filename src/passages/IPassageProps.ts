import {
  IAction,
} from '../actions/IAction';
import {
  IHistoryFilter,
} from '../reducers/IHistoryFilter';
import {
  IPassage,
} from './IPassage';
import {
  IStoryStateInstance,
} from '../state/IStoryStateInstance';
import {
  Dispatch,
} from 'redux';
import {
  Tag,
} from '../tags/Tag';

export interface IPassageProps {
  lastLinkTags: Readonly<Tag[]>;
  passageObject: IPassage;
  storyState: IStoryStateInstance;
  dispatch: Dispatch<IAction>;
  bookmark(): void;
  navigateTo(passageName: string, tags?: Readonly<Tag[]>): void;
  restart(): void;
  rewind(filter?: IHistoryFilter): void;
  setStoryState(updatedStateProps: Partial<IStoryStateInstance>): void;
}
