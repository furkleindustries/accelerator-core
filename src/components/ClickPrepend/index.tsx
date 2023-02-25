import classNames from 'classnames';
import {
  Clicker,
} from '../Clicker';
import {
  IClickPrependOwnProps,
} from './IClickPrependOwnProps';

import * as React from 'react';

export const ClickPrepend: React.FC<IClickPrependOwnProps> = ({
  children,
  className,
  toPrepend,
}) => (
  <Clicker
    className={classNames('click-prepend', className)}
    contentAfterClick={[
      toPrepend,
      children,
    ]}
  >
    {children}
  </Clicker>
);
