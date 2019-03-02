import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper/AppContextConsumerWrapper';
import {
  getNormalizedAcceleratorConfig,
} from '../../configuration/getNormalizedAcceleratorConfig';
import {
  IPassageRenderer,
} from '../../renderers/IPassageRenderer';
import {
  IPassageRendererWrapperOwnProps,
} from './IPassageRendererWrapperOwnProps';

import * as React from 'react';

const {
  rendererName,
  ...configWithoutRendererName
} = getNormalizedAcceleratorConfig();

let renderer: IPassageRenderer;

export const PassageRendererWrapper: React.FunctionComponent<IPassageRendererWrapperOwnProps> = () => (
  <AppContextConsumerWrapper>
    {({
      PassageRendererConstructor,
      ...contextWithoutRenderer
    }) => {
      if (!renderer) {
        renderer = new PassageRendererConstructor(
          configWithoutRendererName,
          contextWithoutRenderer,
        );
      }

      return renderer.render();
    }}
  </AppContextConsumerWrapper>
);
