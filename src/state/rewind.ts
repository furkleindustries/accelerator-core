import {
  createStoryRewindAction,
} from '../actions/creators/createStoryRewindAction';
import {
  getNormalizedAcceleratorConfig,
} from '../configuration/getNormalizedAcceleratorConfig';
import {
  ISoundManagerAware,
} from '../interfaces/ISoundManagerAware';
import {
  IStoryRewindAction,
} from '../actions/IStoryRewindAction';
import type {
  Dispatch,
} from 'redux';
import {
  stopAllSoundsAutomatically,
} from '../functions/stopAllSoundsAutomatically';
import {
  assert,
} from 'ts-assertions';

export const rewind = (
  dispatch: Dispatch<IStoryRewindAction>,
  getSoundManager?: ISoundManagerAware['getSoundManager'],
): IStoryRewindAction => {
  assert(typeof dispatch === 'function');

  const config = getNormalizedAcceleratorConfig();

  if (typeof getSoundManager === 'function') {
    stopAllSoundsAutomatically(
      { ...getSoundManager().collection.groups },
      config.soundManager.excludeFromAutomaticStop,
    );
  }

  return dispatch(createStoryRewindAction());
}
