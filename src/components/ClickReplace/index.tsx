import classNames from 'classnames';
import {
  Clicker,
} from '../Clicker';
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
    className={classNames('clickReplace', className)}
    contentAfterClick={replaceWith}
  >
    {children}
  </Clicker>
);
