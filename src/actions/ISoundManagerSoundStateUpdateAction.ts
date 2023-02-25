import {
  ActionTypes,
} from './ActionTypes';
import {
  ISoundManagerSoundStateFrame,
} from '../state/ISoundManagerSoundStateFrame';

export interface ISoundManagerSoundStateUpdateAction {
  readonly type: ActionTypes.SoundManagerSoundStateUpdate;
  readonly value: ISoundManagerSoundStateFrame;
}
