import {
  ActionTypes,
} from '../actions/ActionTypes';
import {
  getDefaultSoundManagerState,
} from '../state/getDefaultSoundManagerState';
import {
  ISoundManagerGroupStateUpdateAction,
} from '../actions/ISoundManagerGroupStateUpdateAction';
import {
  ISoundManagerSoundStateUpdateAction,
} from '../actions/ISoundManagerSoundStateUpdateAction';
import {
  ISoundManagerStateFrame,
} from '../state/ISoundManagerStateFrame';
import {
  ISoundManagerStateUpdateAction,
} from '../actions/ISoundManagerStateUpdateAction';

export const soundManagerStateReducer = (
  previousState: ISoundManagerStateFrame = getDefaultSoundManagerState(),
  action: ISoundManagerStateUpdateAction |
    ISoundManagerGroupStateUpdateAction |
    ISoundManagerSoundStateUpdateAction,
): ISoundManagerStateFrame => {
  if (action.type === ActionTypes.SoundManagerStateUpdate) {
    return action.value;
  } else if (action.type === ActionTypes.SoundManagerGroupStateUpdate) {
    return {
      groups: {
        ...previousState.groups,
        [action.value.groupName]: { ...action.value },
      },

      sounds: { ...previousState.sounds },
      managerVolume: previousState.managerVolume,
    };
  } else if (action.type === ActionTypes.SoundManagerSoundStateUpdate) {
    return {
      groups: previousState.groups,
      sounds: {
        ...previousState.sounds,
        [action.value.soundName]: {
          ...action.value,
        },
      },

      managerVolume: previousState.managerVolume,
    };
  }

  return previousState;
};
