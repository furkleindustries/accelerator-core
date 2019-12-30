import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import {
  IGetSoundOwnProps,
} from './IGetSoundOwnProps';

import * as React from 'react';

export const GetSound: React.FunctionComponent<
  IGetSoundOwnProps
> = ({
  children,
  placeholder,
  name,
}) => (
  <AppContextConsumerWrapper>
    {({
      soundManager,
      soundManager: {
        collection: {
          getGroup,
          getSound,
          hasIntentToAddSound,
          hasSound,
        },
      },
    }) => {
      if (hasIntentToAddSound(name) || !hasSound(name)) {
        return placeholder || null;
      }

      return children(
        getSound(name),
        {
          getGroup,
          getSound,
          soundManager,
        },
      )
    }}
  </AppContextConsumerWrapper>
);
