import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import {
  FadeIn,
} from '.';
import {
  IFadeInOwnProps,
} from './IFadeInOwnProps';

import * as React from 'react';

export const DebugWrappedFadeIn: React.FC<IFadeInOwnProps> = ({
  duration,
  ...props
}) => (
  <AppContextConsumerWrapper>
    {({
      config: {
        debugOptions: { noTimings },
      },

      store: { getState },
    }) => (
      <FadeIn
        {...props}
        duration={getState().debug && noTimings ? 0 : duration}
      />
    )}
  </AppContextConsumerWrapper>
);
