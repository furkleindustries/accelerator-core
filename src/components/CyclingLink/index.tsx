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

export const CyclingLink: React.FunctionComponent<ICyclingLinkOwnProps> = ({
  children,
  ...props
}) => (
  <AppContextConsumerWrapper>
    {({
      passagesMap,
      plugins,
    }) => (
      <CyclingLinkInternalConnected
        passagesMap={passagesMap}
        plugins={plugins}
        {...props}
      >
        {children}
      </CyclingLinkInternalConnected>
    )}
  </AppContextConsumerWrapper>
);
