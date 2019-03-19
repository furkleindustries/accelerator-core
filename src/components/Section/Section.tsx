import classnames from 'classnames';
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
    {...props}
    className={classnames('section', className)}
    ref={ref}
  >
    {children}
  </section>
));
