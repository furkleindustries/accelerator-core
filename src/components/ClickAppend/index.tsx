import classNames from 'classnames';
import {
  Clicker,
} from '../Clicker';
import {
  IClickAppendOwnProps,
} from './IClickAppendOwnProps';

import * as React from 'react';

export const ClickAppend: React.FunctionComponent<IClickAppendOwnProps> = ({
  className,
  children,
  toAppend,
}) => (
  <Clicker
    className={classNames('clickAppend', className)}
    contentAfterClick={[
      children,
      toAppend,
    ]}
  >
    {children}
  </Clicker>
);
