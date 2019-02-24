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
} from 'react-hot-loader';

import * as React from 'react';

export class App extends React.PureComponent {
  public render() {
    return (
      <>
        <AppJssProvider>
          <AppContextProviderWrapper>
            <PassageContainerConnected />
          </AppContextProviderWrapper>
        </AppJssProvider>
      </>
    );
  }
}

export default hot(module)(App);
