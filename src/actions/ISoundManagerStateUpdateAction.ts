import {
  ActionTypes,
} from './ActionTypes';
import {
  ISoundManagerStateFrame,
} from '../state/ISoundManagerStateFrame';

export interface ISoundManagerStateUpdateAction {
  readonly type: ActionTypes.SoundManagerStateUpdate;
  readonly value: ISoundManagerStateFrame;
}
