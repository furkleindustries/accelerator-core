import {
  IPassagesMap,
} from '../passages/IPassagesMap';
import {
  IStoryState,
} from '../state/IStoryState';

export interface IState {
  currentPassageName: string;
  passages: IPassagesMap;
  storyState: IStoryState;
}

export default IState;
