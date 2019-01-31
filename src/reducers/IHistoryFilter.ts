import {
  IStateFrame,
} from '../state/IStateFrame';

export type HistoryFilter = (state: IStateFrame) => boolean; 