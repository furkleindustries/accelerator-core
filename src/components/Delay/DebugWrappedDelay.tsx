import {
  Delay,
} from '.';
import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import {
  IDelayOwnProps,
} from './IDelayOwnProps';

import * as React from 'react';

export const DebugWrappedDelay = (props: IDelayOwnProps) => (
  <AppContextConsumerWrapper>
    {({
      config: {
        debugOptions: { noTimings },
      },

      store: { getState },
    }) => (
      <Delay
        {...props}
        timeout={getState().debug && noTimings ? 0 : props.timeout}
      />
    )}
  </AppContextConsumerWrapper>
);
