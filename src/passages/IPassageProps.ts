import {
  IAction,
} from '../actions/IAction';
import {
  IStoryState,
} from '../state/IStoryState';
import {
  IStoryStateAction,
} from '../actions/IStoryStateAction';

export interface IPassageProps {
  storyState: IStoryState;
  dispatch(action: IAction): IAction;
  setStoryState(key: string, value: any): IStoryStateAction;
}

export default IPassageProps;
