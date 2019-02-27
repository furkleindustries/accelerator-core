import {
  Clicker,
} from '../Clicker/Clicker';
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
    {...(className ? { className } : {})}
    contentAfterClick={[ children, toAppend, ]}
  >
    {children}
  </Clicker>
);
