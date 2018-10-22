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

export interface IPassageProps {
  passageObject: IPassage;
  storyState: IStoryStateInstance;
  dispatch(action: IAction): IAction;
  setStoryState(newState: { [key: string]: any, }): IStoryStateAction;
}

export default IPassageProps;
