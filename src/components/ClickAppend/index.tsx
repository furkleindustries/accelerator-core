import classNames from 'classnames';
import {
  Clicker,
} from '../Clicker';
import {
  IClickAppendOwnProps,
} from './IClickAppendOwnProps';

import * as React from 'react';

export const ClickAppend: React.FC<IClickAppendOwnProps> = ({
  className,
  children,
  toAppend,
}) => (
  <Clicker
    className={classNames('click-append', className)}
    contentAfterClick={[
      children,
      toAppend,
    ]}
  >
    {children}
  </Clicker>
);
