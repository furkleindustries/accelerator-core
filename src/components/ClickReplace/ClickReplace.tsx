import {
  Clicker,
} from '../Clicker/Clicker';
import {
  IClickReplaceOwnProps,
} from './IClickReplaceProps';

import * as React from 'react';

export const ClickReplace: React.FunctionComponent<IClickReplaceOwnProps> = ({
  children,
  className,
  replaceWith,
}) => (
  <Clicker
    contentAfterClick={replaceWith}
    {...(className ? { className, } : {})}
  >
    {children}
  </Clicker>
);
