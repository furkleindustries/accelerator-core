import {
  CyclingLinkInternalConnected,
} from '../CyclingLinkInternal/CyclingLinkInternal';
import {
  getPassagesMapAndStartPassageNameContext,
} from '../context/getPassagesMapAndStartPassageNameContext';
import {
  getPluginsContext,
} from '../context/getPluginsContext';
import {
  ICyclingLinkInternalDispatchProps,
} from '../CyclingLinkInternal/ICyclingLinkInternalDispatchProps';
import {
  ICyclingLinkOwnProps,
} from './ICyclingLinkOwnProps';
import {
  ICyclingLinkInternalStateProps,
} from '../CyclingLinkInternal/ICyclingLinkInternalStateProps';

import * as React from 'react';

export const strings = {
  FIRST_STATE_EMPTY:
    'The first state was not provided to the CyclingLink component, or it ' +
    'was an empty string.',
};

const {
  Consumer: PassagesMapAndStartPassageNameContextConsumer,
} = getPassagesMapAndStartPassageNameContext();

const { Consumer: PluginContextConsumer } = getPluginsContext();

export class CyclingLink extends React.PureComponent<
  ICyclingLinkOwnProps &
  ICyclingLinkInternalStateProps &
  ICyclingLinkInternalDispatchProps
>
{
  public render() {
    const {
      callback,
      children,
      className,
      dontCallbackOnMount,
      dontSetVariableOnMount,
      variableToSet,
    } = this.props;

    return (
      <PassagesMapAndStartPassageNameContextConsumer>
        {({ passagesMap }) => (
          <PluginContextConsumer>
            {({ plugins }) => (
              <CyclingLinkInternalConnected
                callback={callback}
                className={className}
                dontCallbackOnMount={dontCallbackOnMount}
                dontSetVariableOnMount={dontSetVariableOnMount}
                passagesMap={passagesMap}
                plugins={plugins}
                variableToSet={variableToSet}
              >
                {children}
              </CyclingLinkInternalConnected>
            )}
          </PluginContextConsumer>
        )}
      </PassagesMapAndStartPassageNameContextConsumer>
    );
  }
}
