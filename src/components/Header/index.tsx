import classNames from 'classnames';
import {
  IHeaderOwnProps,
} from './IHeaderOwnProps';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const Header = React.forwardRef<HTMLElement, IHeaderOwnProps>(({
  children,
  className,
  ...props
}, ref) => (
  <header
    className={classNames(
      builtIns.header,
      'header',
      className,
    )}

    ref={ref}

    {...props}
  >
    {children}
  </header>
));
