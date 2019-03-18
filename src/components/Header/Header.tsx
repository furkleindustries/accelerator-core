import classnames from 'classnames';
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
    className={classnames('header', className)}
    ref={ref}
    {...props}
  >
    {children}
  </header>
));
