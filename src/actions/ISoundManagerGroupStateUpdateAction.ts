import {
  ISoundManagerGroupStateFrame,
} from '../state/ISoundManagerGroupStateFrame';
import {
  ActionTypes,
} from './ActionTypes';

export interface ISoundManagerGroupStateUpdateAction {
  readonly type: ActionTypes.SoundManagerGroupStateUpdate;
  readonly value: ISoundManagerGroupStateFrame;
}
