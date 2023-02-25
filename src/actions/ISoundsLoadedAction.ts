import {
  ActionTypes,
} from './ActionTypes';

export interface ISoundsLoadedAction {
  readonly type: ActionTypes.SoundsLoaded;
  readonly value: boolean;
}