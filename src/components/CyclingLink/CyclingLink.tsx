import {
  CyclingLinkInternalConnected,
} from '../CyclingLinkInternal/CyclingLinkInternal';
import {
  getPassagesMapAndStartPassageNameContext,
} from '../../context/getPassagesMapAndStartPassageNameContext';
import {
  getPluginsContext,
} from '../../context/getPluginsContext';
import {
  ICyclingLinkOwnProps,
} from './ICyclingLinkOwnProps';

import * as React from 'react';

export const strings = {
  FIRST_STATE_EMPTY:
    'The first state was not provided to the CyclingLink component, or it ' +
    'was an empty string.',
};

const {
  Consumer: PassagesMapAndStartPassageNameContextConsumer,
} = getPassagesMapAndStartPassageNameContext();

const { Consumer: PluginContextConsumer } = getPluginsContext();

export const CyclingLink: React.FunctionComponent<ICyclingLinkOwnProps> = (props) => (
  <PassagesMapAndStartPassageNameContextConsumer>
    {({ passagesMap }) => (
      <PluginContextConsumer>
        {({ plugins }) => (
          <CyclingLinkInternalConnected
            passagesMap={passagesMap}
            plugins={plugins}
            {...props}
          >
            {props.children}
          </CyclingLinkInternalConnected>
        )}
      </PluginContextConsumer>
    )}
  </PassagesMapAndStartPassageNameContextConsumer>
);
