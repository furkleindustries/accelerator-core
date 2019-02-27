import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper/AppContextConsumerWrapper';
import {
  getNormalizedAcceleratorConfig,
} from '../../configuration/getNormalizedAcceleratorConfig';
import {
  IPassageRendererWrapperOwnProps,
} from './IPassageRendererWrapperOwnProps';
import {
  ReactReduxContext,
} from 'react-redux';

import * as React from 'react';

const {
  renderer,
  ...configWithoutRenderer
} = getNormalizedAcceleratorConfig();

export const PassageRendererWrapper: React.FunctionComponent<IPassageRendererWrapperOwnProps> = () => (
  <ReactReduxContext.Consumer>
    {({ storeState }) => (
      <AppContextConsumerWrapper>
        {(context) => renderer(configWithoutRenderer, context, storeState)}
      </AppContextConsumerWrapper>
    )}
  </ReactReduxContext.Consumer>
);
