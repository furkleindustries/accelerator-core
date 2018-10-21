import {
  IAction,
} from '../actions/IAction';
import {
  IPassage,
} from './IPassage';
import {
  IStoryState,
} from '../state/IStoryState';
import {
  IStoryStateAction,
} from '../actions/IStoryStateAction';

export interface IPassageProps {
  passageObject: IPassage;
  storyState: IStoryState;
  dispatch(action: IAction): IAction;
  setStoryState(newState: { [key: string]: any, }): IStoryStateAction;
}

export default IPassageProps;
