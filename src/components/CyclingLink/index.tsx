import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import {
  CyclingLinkInternalConnected,
} from '../CyclingLinkInternal';
import {
  ICyclingLinkOwnProps,
} from './ICyclingLinkOwnProps';

import * as React from 'react';

export const strings = {
  FIRST_STATE_EMPTY:
    'The first state was not provided to the CyclingLink component, or it ' +
    'was an empty string.',
};

export const CyclingLink: React.FC<ICyclingLinkOwnProps> = ({
  children,
  ...props
}) => (
  <AppContextConsumerWrapper>
    {({
      getSoundManager,
      passagesMap,
      plugins,
    }) => (
      <CyclingLinkInternalConnected
        {...props}

        getSoundManager={getSoundManager}
        passagesMap={passagesMap}
        plugins={plugins}
      >
        {children}
      </CyclingLinkInternalConnected>
    )}
  </AppContextConsumerWrapper>
);
