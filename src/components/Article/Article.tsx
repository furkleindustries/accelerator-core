import classnames from 'classnames';
import {
  IArticleOwnProps,
} from './IArticleOwnProps';

import * as React from 'react';

export const Article = React.forwardRef<HTMLElement, IArticleOwnProps>(({
  children,
  className,
  ...props
}, ref) => (
  <article
    {...props}
    className={classnames('article', className)}
    ref={ref}
  >
    {children}
  </article>
));
