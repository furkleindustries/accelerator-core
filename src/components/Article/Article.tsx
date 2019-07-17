import classNames from 'classnames';
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
    className={classNames(className, 'article')}
    ref={ref}
  >
    {children}
  </article>
));
