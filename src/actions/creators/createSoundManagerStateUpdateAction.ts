import {
  ActionTypes,
} from '../ActionTypes';
import {
  ISoundManagerStateUpdateAction,
} from '../ISoundManagerStateUpdateAction';
import {
  ISoundManagerStateFrame,
} from '../../state/ISoundManagerStateFrame';

export const createSoundManagerStateUpdateAction = (
  value: ISoundManagerStateFrame,
): ISoundManagerStateUpdateAction => Object.freeze({
  type: ActionTypes.SoundManagerStateUpdate,
  value,
});