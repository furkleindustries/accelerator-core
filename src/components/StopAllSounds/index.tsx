import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';

import * as React from 'react';

export const StopAllSounds = ({ group = '' }) => (
  <AppContextConsumerWrapper>
    {({ getSoundManager }) => {
      const {
        collection: {
          getGroup,
          hasGroup,
        },
        player: { stopAllSounds },
      } = getSoundManager();

      if (group) {
        if (!hasGroup(group)) {
          throw new Error(`Could not find group "${group}" in Sound Manager state.`);
        }

        const groupObj = getGroup(group);
        groupObj.stopAllSounds();
      } else {
        stopAllSounds();
      }
    }}
  </AppContextConsumerWrapper>
);
