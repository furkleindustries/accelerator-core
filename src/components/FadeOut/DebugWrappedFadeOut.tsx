import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import {
  FadeOut,
} from '.';
import {
  IFadeOutOwnProps,
} from './IFadeOutOwnProps';

import * as React from 'react';

export const DebugWrappedFadeOut: React.FC<IFadeOutOwnProps> = ({
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
      <FadeOut
        {...props}
        duration={getState() && noTimings ? 0 : duration}
      />
    )}
  </AppContextConsumerWrapper>
);
