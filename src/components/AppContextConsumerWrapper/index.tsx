import {
  getAppContext,
} from '../../context/getAppContext';
import {
  IAppContextConsumerWrapperOwnProps,
} from './IAppContextConsumerWrapperOwnProps';

import * as React from 'react';

export const AppContextConsumerWrapper: React.FC<IAppContextConsumerWrapperOwnProps> = ({
  children,
}) => {
  const ctx = getAppContext();

  if (ctx && ctx.Consumer) {
    if (typeof children !== 'function') {
      throw new Error(
        'The child passed to AppContextConsumerWrapper was not a function.'
      );
    }

    return (
      <ctx.Consumer>
        {(props) => children({ ...props })}
      </ctx.Consumer>
    );
  }

  return null;
};
