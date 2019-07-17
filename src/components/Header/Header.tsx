import classNames from 'classnames';
import {
  IHeaderOwnProps,
} from './IHeaderOwnProps';

import * as React from 'react';

export const Header = React.forwardRef<HTMLElement, IHeaderOwnProps>(({
  children,
  className,
  ...props
}, ref) => (
  <header
    {...props}
    className={classNames('header', className)}
    ref={ref}
  >
    {children}
  </header>
));
