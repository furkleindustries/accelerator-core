import {
  TPassageHistory,
} from './TPassageHistory';
import {
  TStoryStateHistory,
} from './TStoryStateHistory';

export interface IState {
  currentPassageName: string;
  passageHistory: TPassageHistory;
  startPassageName: string;
  storyRequiresFullRerender: boolean;
  storyStateHistory: TStoryStateHistory;
}
