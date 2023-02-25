import classNames from 'classnames';
import {
  ISectionOwnProps,
} from './ISectionOwnProps';

import * as React from 'react';

export const Section = React.forwardRef<HTMLElement, ISectionOwnProps>(({
  children,
  className,
  ...props
}, ref) => (
  <section
    className={classNames('section', className)}
    ref={ref}
    {...props}
  >
    {children}
  </section>
));
