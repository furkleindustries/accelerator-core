import classNames from 'classnames';

import * as React from 'react';

import styles from '../../../passages/_global-styles/components/index.less';

export const Blockquote: React.FC<React.BlockquoteHTMLAttributes<HTMLElement>> = ({
  children,
  className,
  ...props
}) => (
  <blockquote
    {...props}
    className={classNames(
      styles.blockquote,
      'blockquote',
      className,
    )}
  >
    {children}
  </blockquote>
);
