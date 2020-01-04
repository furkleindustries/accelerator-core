import classNames from 'classnames';
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
    {...props}
    className={classNames('footer', className)}
    ref={ref}
  >
    {children}
  </footer>
));
