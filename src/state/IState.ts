import {
  IHistory,
} from './IHistory';

export interface IState {
  history: IHistory;
  startPassageName: string;
  storyRequiresFullRerender: boolean;
}
