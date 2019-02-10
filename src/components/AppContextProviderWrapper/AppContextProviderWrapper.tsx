import {
  getPassagesMapAndStartPassageNameContext,
} from '../context/getPassagesMapAndStartPassageNameContext';
import {
  getSoundManagerContext,
} from '../context/getSoundManagerContext';
import {
  createManager,
} from 'sound-manager';

import * as React from 'react';
import { getFootersContext } from '../context/getFootersContext';
import { getHeadersContext } from '../context/getHeadersContext';
import { getPluginsContext } from '../context/getPluginsContext';
import { getPassagesMapAndStartPassageName } from '../../passages/getPassagesMapAndStartPassageName';
import { getFootersList } from '../../passages/getFootersList';
import { getHeadersList } from '../../passages/getHeadersList';
import { getPluginsList } from '../../plugins/getPluginsList';

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
const soundManager = createManager();

export class AppContextProviderWrapper extends React.PureComponent {
  render() {
    const { children } = this.props;
    
    return (
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
  }
}