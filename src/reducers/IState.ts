import {
  IPassagesMap,
} from '../passages/IPassagesMap';
import {
  TPassageHistory,
} from '../state/TPassageHistory';
import {
  TStoryStateHistory,
} from '../state/TStoryStateHistory';

export interface IState {
  currentPassageName: string;
  passages: IPassagesMap;
  passageHistory: TPassageHistory;
  startPassageName: string;
  storyStateHistory: TStoryStateHistory;
}

export default IState;
