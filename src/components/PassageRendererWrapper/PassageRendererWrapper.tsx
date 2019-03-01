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
  rendererName,
  ...configWithoutRendererName
} = getNormalizedAcceleratorConfig();

export const PassageRendererWrapper: React.FunctionComponent<IPassageRendererWrapperOwnProps> = () => (
  <AppContextConsumerWrapper>
    {({
      PassageRendererConstructor,
      ...contextWithoutRenderer
    }) => (
      new PassageRendererConstructor(
        configWithoutRendererName,
        contextWithoutRenderer,
      ).render()
    )}
  </AppContextConsumerWrapper>
);
