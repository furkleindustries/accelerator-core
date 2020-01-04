import {
  createManager,
} from 'sound-manager';
import {
  getAppContext,
} from '../../context/getAppContext';
import {
  getFootersList,
} from '../../passages/getFootersList';
import {
  getHeadersList,
} from '../../passages/getHeadersList';
import {
  getPassageRenderer,
} from '../../renderers/getPassageRenderer';
import {
  getPluginsList,
} from '../../plugins/getPluginsList';
import {
  getPassagesMapAndStartPassageName,
} from '../../passages/getPassagesMapAndStartPassageName';
import {
  getReactReduxContext,
} from '../../context/getReactReduxContext';
import {
  IAppContextProviderWrapperOwnProps,
} from './IAppContextProviderWrapperOwnProps';

import * as React from 'react';

const { Provider: AppContextProvider } = getAppContext();
const { Consumer: ReduxStoreConsumer } = getReactReduxContext(); 

const footers = getFootersList();
const headers = getHeadersList();
const PassageRendererConstructor = getPassageRenderer();
const {
  passagesMap,
  startPassageName,
} = getPassagesMapAndStartPassageName();
const plugins = getPluginsList();
const soundManager = createManager();

export const AppContextProviderWrapper: React.FunctionComponent<IAppContextProviderWrapperOwnProps> = ({
  children,
}) => (
  <ReduxStoreConsumer>
    {(({ store }) => (
      <AppContextProvider value={{
        footers,
        headers,
        passagesMap,
        plugins,
        soundManager,
        startPassageName,
        store,
        PassageRendererComponent: PassageRendererConstructor,
      }}>
        {children}
      </AppContextProvider>
    ))}
  </ReduxStoreConsumer>
);
