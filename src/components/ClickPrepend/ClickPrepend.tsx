import {
  Clicker,
} from '../Clicker/Clicker';
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
    contentAfterClick={[ toPrepend, children, ]}
    {...(className ? { className } : {})}
  >
    {children}
  </Clicker>
);
