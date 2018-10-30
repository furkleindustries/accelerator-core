import {
  IAction,
} from '../actions/IAction';
import {
  IPassage,
} from './IPassage';
import {
  IStoryStateAction,
} from '../actions/IStoryStateAction';
import {
  IStoryStateInstance,
} from '../state/IStoryStateInstance';
import {
  Tag,
} from '../tags/Tag';

export interface IPassageProps {
  lastLinkTags: Tag[];
  passageObject: IPassage;
  storyState: IStoryStateInstance;
  dispatch(action: IAction): IAction;
  navigateTo(passageName: string, tags?: Tag[]): void;
  setStoryState(newState: { [key: string]: any, }): IStoryStateAction;
}

export default IPassageProps;
