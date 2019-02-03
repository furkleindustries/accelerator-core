import {
  IHistory,
} from './IHistory';

export interface IState {
  readonly history: IHistory;
  readonly storyRequiresFullRerender: boolean;
}
