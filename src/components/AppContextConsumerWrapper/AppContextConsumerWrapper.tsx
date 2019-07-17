import {
  IAppContextConsumerWrapperOwnProps,
} from './IAppContextConsumerWrapperOwnProps';
import {
  getAppContext,
} from '../../context/getAppContext';

import * as React from 'react';

const { Consumer: AppContextConsumer } = getAppContext();

export const AppContextConsumerWrapper: React.FunctionComponent<IAppContextConsumerWrapperOwnProps> = ({
  children,
}) => (
  <AppContextConsumer>{(props) => children({ ...props })}</AppContextConsumer>
);
