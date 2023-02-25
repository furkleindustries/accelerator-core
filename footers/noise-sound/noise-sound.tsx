import {
  IFooter,
  IPassageProps,
} from '../../bundles/passagesBundle';
import {
  playSound,
} from '../../src/functions/playSound';

import * as React from 'react';

const Footer: React.FC<IPassageProps> = React.memo(
  ({
    config,
    dispatch,
    getSoundManager,
    store: { getState },
  }) => {
    const { debug } = getState();

    const soundManager = getSoundManager();
    const {
      collection: {
        hasSound,
        getSound,
      },
    } = soundManager;

    const groupName = 'ambience';
    const soundName = 'noise';
    if (hasSound(soundName, groupName)) {
      const { isPlaying } = getSound(soundName, groupName);
      if (!isPlaying()) {
        playSound({
          config,
          debug,
          dispatch,
          getSoundManager,
          groupName,
          soundName,
        });
      }
    }

    return null;
  },

  (
    {
      passageObject: { name: prevPassageName },
    },

    {
      passageObject: { name: nextPassageName }
    }
  ) => (
    prevPassageName === nextPassageName
  ),
);

Footer.displayName = 'NoiseSoundFooter';

const footer: IFooter = {
  name: 'noise-sound',
  content: Footer,
};

export default footer;
