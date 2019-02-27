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
  getPassagesMapAndStartPassageNameContext,
} from '../../context/getPassagesMapAndStartPassageNameContext';
import {
  getPluginsContext,
} from '../../context/getPluginsContext';
import {
  getSoundManagerContext,
} from '../../context/getSoundManagerContext';

import * as React from 'react';

const { Consumer: FootersConsumer } = getFootersContext();
const { Consumer: HeadersConsumer } = getHeadersContext();
const {
  Consumer: PassagesMapAndStartPassageNameConsumer,
} = getPassagesMapAndStartPassageNameContext();

const { Consumer: PluginsConsumer } = getPluginsContext();
const { Consumer: SoundManagerConsumer } = getSoundManagerContext();

export const AppContextConsumerWrapper: React.FunctionComponent<IAppContextConsumerWrapperOwnProps> = ({ children }) => (
  <FootersConsumer>
    {({ footers }) => (
      <HeadersConsumer>
        {({ headers }) => (
          <PassagesMapAndStartPassageNameConsumer>
            {({
              passagesMap,
              startPassageName,
             }) => (
              <PluginsConsumer>
                {({ plugins }) => (
                  <SoundManagerConsumer>
                    {({ soundManager }) => !children || children({
                      footers,
                      headers,
                      passagesMap,
                      plugins,
                      soundManager,
                      startPassageName,
                    })}
                  </SoundManagerConsumer>
                )}
              </PluginsConsumer>
             )}
          </PassagesMapAndStartPassageNameConsumer>
        )}
      </HeadersConsumer>
    )}
  </FootersConsumer>
);
