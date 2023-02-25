import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import {
  isValidVolume,
} from 'sound-manager';
import {
  IUpdateSoundOwnProps,
} from './IUpdateSoundOwnProps';

import * as React from 'react';

export const UpdateSound = ({
  fade,
  loop,
  group = 'default',
  name,
  trackPosition,
  volume,
}: IUpdateSoundOwnProps) => (
  <AppContextConsumerWrapper>
    {({
      config: {
        loggers: {
          error,
          log,
          warn,
        },
      },

      getSoundManager,
      store: { getState },
    }) => {
      const { debug } = getState();

      const {
        collection: {
          getSound,
          hasSound,
        },
      } = getSoundManager();

      try {
        if (!hasSound(name, group)) {
          warn(
            `The requested sound, ${name} from group ${group}, did not exist to update.`,
          );
        }

        const {
          setFade,
          setLoop,
          setTrackPosition,
          setVolume,
        } = getSound(name, group);

        if (debug) {
          log('---- Sound Manager ----');
          log(`Updating sound "${name}" from group "${group}" at ${new Date().toUTCString()}.`);
          log(`Updates:\n${fade ? `Fade: ${JSON.stringify(fade)}, ` : ''}${typeof loop !== 'undefined' ? `Loop: ${loop} ` : ''}${typeof trackPosition === 'number' ? `Track position: ${trackPosition} ` : ''}${isValidVolume(Number(volume)) ? `Volume: ${Number(volume)} ` : ''}`);
          log('--------');
        }

        if (fade) {
          setFade(fade);
        }

        if (typeof loop === 'boolean') {
          setLoop(loop);
        }

        if (trackPosition! >= 0) {
          setTrackPosition(trackPosition!);
        }

        const vol = Number(volume);
        if (isValidVolume(vol)) {
          setVolume(vol);
        }

      } catch (err) {
        error(err);
      }

      return null;
    }}
  </AppContextConsumerWrapper>
);
