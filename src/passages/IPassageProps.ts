import {
  IAction,
} from '../actions/IAction';
import {
  IPassage,
} from './IPassage';
import {
  IStoryStateUpdateAction,
} from '../actions/IStoryStateUpdateAction';
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
  navigateTo(passageName: string, tags?: Readonly<Tag[]>): void;
  restart(): void;
  setStoryState(newState: Partial<IStoryStateInstance>): IStoryStateUpdateAction;
}

export default IPassageProps;
