import {
  ActionTypes,
} from '../ActionTypes';
import {
  ISoundManagerGroupStateFrame,
} from '../../state/ISoundManagerGroupStateFrame';
import {
  ISoundManagerGroupStateUpdateAction,
} from '../ISoundManagerGroupStateUpdateAction';

export const createSoundManagerGroupStateUpdateAction = (
  value: ISoundManagerGroupStateFrame,
): ISoundManagerGroupStateUpdateAction => Object.freeze({
  type: ActionTypes.SoundManagerGroupStateUpdate,
  value,
});