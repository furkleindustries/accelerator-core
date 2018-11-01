import {
  TPassageHistory,
} from '../state/TPassageHistory';
import {
  TStoryStateHistory,
} from '../state/TStoryStateHistory';

export interface IState {
  currentPassageName: string;
  passageHistory: TPassageHistory;
  startPassageName: string;
  storyStateHistory: TStoryStateHistory;
}

export default IState;
