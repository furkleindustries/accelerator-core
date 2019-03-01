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
  renderer: RendererCtor,
  ...configWithoutRenderer
} = getNormalizedAcceleratorConfig();

let renderer: IPassageRenderer | null = null;

export const PassageRendererWrapper: React.FunctionComponent<IPassageRendererWrapperOwnProps> = () => (
  <AppContextConsumerWrapper>
    {(context) => {
      if (!renderer) {
        renderer = new RendererCtor(configWithoutRenderer, context);
      }

      return renderer!.render();
    }}
  </AppContextConsumerWrapper>
);
