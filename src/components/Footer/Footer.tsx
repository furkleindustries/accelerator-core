import classnames from 'classnames';
import {
  IFooterOwnProps,
} from './IFooterOwnProps';

import * as React from 'react';

export const Footer = React.forwardRef<HTMLElement, IFooterOwnProps>(({
  children,
  className,
  ...props
}, ref) => (
  <footer
    className={classnames('footer', className)}
    ref={ref}
    {...props}
  >
    {children}
  </footer>
));
