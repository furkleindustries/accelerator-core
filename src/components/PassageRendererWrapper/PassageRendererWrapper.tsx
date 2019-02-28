import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper/AppContextConsumerWrapper';
import {
  getNormalizedAcceleratorConfig,
} from '../../configuration/getNormalizedAcceleratorConfig';
import {
  IPassageRendererWrapperOwnProps,
} from './IPassageRendererWrapperOwnProps';

import * as React from 'react';

const {
  renderer: { render },
  ...configWithoutRenderer
} = getNormalizedAcceleratorConfig();

export const PassageRendererWrapper: React.FunctionComponent<IPassageRendererWrapperOwnProps> = () => (
  <AppContextConsumerWrapper>
    {(context) => render(configWithoutRenderer, context)}
  </AppContextConsumerWrapper>
);
