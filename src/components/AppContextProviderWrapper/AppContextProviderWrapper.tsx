import {
  getFootersContext,
} from '../../context/getFootersContext';
import {
  getFootersList,
} from '../../passages/getFootersList';
import {
  getHeadersContext,
} from '../../context/getHeadersContext';
import {
  getHeadersList,
} from '../../passages/getHeadersList';
import {
  getPluginsContext,
} from '../../context/getPluginsContext';
import {
  getPluginsList,
} from '../../plugins/getPluginsList';
import {
  getPassagesMapAndStartPassageName,
} from '../../passages/getPassagesMapAndStartPassageName';
import {
  getPassagesMapAndStartPassageNameContext,
} from '../../context/getPassagesMapAndStartPassageNameContext';
import {
  getSoundManagerContext,
} from '../../context/getSoundManagerContext';
import {
  IAppContextProviderWrapperOwnProps,
} from './IAppContextProviderWrapperOwnProps';

import * as React from 'react';

const { Provider: FootersContextProvider } = getFootersContext();
const { Provider: HeadersContextProvider } = getHeadersContext();
const {
  Provider: PassagesMapAndStartPassageNameProvider,
} = getPassagesMapAndStartPassageNameContext();

const { Provider: PluginsContextProvider } = getPluginsContext();
const { Provider: SoundManagerProvider } = getSoundManagerContext();

const footers = getFootersList();
const headers = getHeadersList();
const passagesMapAndStartPassageName = getPassagesMapAndStartPassageName();
const plugins = getPluginsList();

export const AppContextProviderWrapper: React.FunctionComponent<IAppContextProviderWrapperOwnProps> = ({
  children,
  soundManager,
}) => (
  <FootersContextProvider value={{ footers }}>
    <HeadersContextProvider value={{ headers }}>
      <PassagesMapAndStartPassageNameProvider
        value={passagesMapAndStartPassageName}
      >
        <PluginsContextProvider value={{ plugins }}>
          <SoundManagerProvider value={{ soundManager }}>
            {children}
          </SoundManagerProvider>
        </PluginsContextProvider>
      </PassagesMapAndStartPassageNameProvider>
    </HeadersContextProvider>
  </FootersContextProvider>
);
