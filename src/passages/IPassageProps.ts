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
  Tag,
} from '../tags/Tag';

export interface IPassageProps {
  lastLinkTags: Tag[];
  passageObject: IPassage;
  storyState: IStoryStateInstance;
  dispatch(action: IAction): IAction;
  navigateTo(passageName: string, tags?: Tag[]): void;
  restart(): void;
  setStoryState(newState: Partial<IStoryStateInstance>): IStoryStateUpdateAction;
}

export default IPassageProps;
