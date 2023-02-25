import classNames from 'classnames';
import {
  Clicker,
} from '../Clicker';
import {
  IClickReplaceOwnProps,
} from './IClickReplaceProps';

import * as React from 'react';

export const ClickReplace: React.FC<IClickReplaceOwnProps> = ({
  children,
  className,
  replaceWith,
}) => (
  <Clicker
    className={classNames('click-replace', className)}
    contentAfterClick={replaceWith}
  >
    {children}
  </Clicker>
);
