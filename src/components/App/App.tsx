import {
  AppContextProviderWrapper,
} from '../AppContextProviderWrapper/AppContextProviderWrapper';
import {
  AppJssProvider,
} from '../AppJssProvider/AppJssProvider';
import {
  PassageContainerConnected,
} from '../PassageContainer/PassageContainer';
import {
  hot,
} from 'react-hot-loader/root';

import * as React from 'react';

export const App: React.FunctionComponent = () => (
  <AppJssProvider>
    <AppContextProviderWrapper>
      <PassageContainerConnected />
    </AppContextProviderWrapper>
  </AppJssProvider>
);

export default hot(App);
