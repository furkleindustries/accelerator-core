import {
  IAppContextConsumerWrapperOwnProps,
} from './IAppContextConsumerWrapperOwnProps';
import {
  getFootersContext,
} from '../../context/getFootersContext';
import {
  getHeadersContext,
} from '../../context/getHeadersContext';
import {
  getPassageRendererConstructorContext,
} from '../../context/getPassageRendererConstructorContext';
import {
  getPassagesMapAndStartPassageNameContext,
} from '../../context/getPassagesMapAndStartPassageNameContext';
import {
  getPluginsContext,
} from '../../context/getPluginsContext';
import {
  getReactReduxContext,
} from '../../context/getReactReduxContext';
import {
  getSoundManagerContext,
} from '../../context/getSoundManagerContext';

import * as React from 'react';

const { Consumer: FootersConsumer } = getFootersContext();
const { Consumer: HeadersConsumer } = getHeadersContext();
const { Consumer: PassageRendererConstructorConsumer } = getPassageRendererConstructorContext();
const {
  Consumer: PassagesMapAndStartPassageNameConsumer,
} = getPassagesMapAndStartPassageNameContext();

const { Consumer: PluginsConsumer } = getPluginsContext();
const { Consumer: ReactReduxConsumer } = getReactReduxContext();
const { Consumer: SoundManagerConsumer } = getSoundManagerContext();

export const AppContextConsumerWrapper: React.FunctionComponent<IAppContextConsumerWrapperOwnProps> = ({ children }) => (
  <FootersConsumer>
    {({ footers }) => (
      <HeadersConsumer>
        {({ headers }) => (
          <PassageRendererConstructorConsumer>
            {({ PassageRendererComponent: PassageRendererConstructor }) => (
              <PassagesMapAndStartPassageNameConsumer>
                {({
                  passagesMap,
                  startPassageName,
                }) => (
                  <PluginsConsumer>
                    {({ plugins }) => (
                      <ReactReduxConsumer>
                        {({ store }) => (
                          <SoundManagerConsumer>
                            {({ soundManager }) => children({
                              footers,
                              headers,
                              PassageRendererComponent: PassageRendererConstructor,
                              passagesMap,
                              plugins,
                              soundManager,
                              startPassageName,
                              store,
                            })}
                          </SoundManagerConsumer>
                        )}
                      </ReactReduxConsumer>
                    )}
                  </PluginsConsumer>
                )}
              </PassagesMapAndStartPassageNameConsumer>
            )}
          </PassageRendererConstructorConsumer>
        )}
      </HeadersConsumer>
    )}
  </FootersConsumer>
);
