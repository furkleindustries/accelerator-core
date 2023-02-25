import {
  ActionTypes,
} from '../ActionTypes';
import {
  ISoundManagerSoundStateFrame,
} from '../../state/ISoundManagerSoundStateFrame';
import {
  ISoundManagerSoundStateUpdateAction,
} from '../ISoundManagerSoundStateUpdateAction';

export const createSoundManagerSoundStateUpdateAction = (
  value: ISoundManagerSoundStateFrame,
): ISoundManagerSoundStateUpdateAction => Object.freeze({
  type: ActionTypes.SoundManagerSoundStateUpdate,
  value,
});