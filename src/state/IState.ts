import {
  IHistory,
} from './IHistory';

export interface IState {
  history: IHistory;
  storyRequiresFullRerender: boolean;
}
