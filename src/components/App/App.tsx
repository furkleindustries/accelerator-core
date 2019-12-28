import {
  AppContextProviderWrapper,
} from '../AppContextProviderWrapper';
import {
  AppJssProvider,
} from '../AppJssProvider';
import {
  hot,
} from 'react-hot-loader/root';
import {
  RenderingContainerConnected,
} from '../RenderingContainer';

import * as React from 'react';

export const App: React.FunctionComponent = () => (
  <AppJssProvider>
    <AppContextProviderWrapper>
      <RenderingContainerConnected />
    </AppContextProviderWrapper>
  </AppJssProvider>
);

export default hot(App);
