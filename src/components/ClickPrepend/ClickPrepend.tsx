import classNames from 'classnames';
import {
  Clicker,
} from '../Clicker';
import {
  IClickPrependOwnProps,
} from './IClickPrependOwnProps';

import * as React from 'react';

export const ClickPrepend: React.FunctionComponent<IClickPrependOwnProps> = ({
  children,
  className,
  toPrepend,
}) => (
  <Clicker
    className={classNames(className, 'clickPrepend')}
    contentAfterClick={[
      toPrepend,
      children,
    ]}
  >
    {children}
  </Clicker>
);
