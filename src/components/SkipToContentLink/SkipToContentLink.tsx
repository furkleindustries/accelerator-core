import classNames from 'classnames';
import {
  getDefaultSkipToContentHref,
} from '../../functions/getDefaultSkipToContentLinkHref';
import {
  ISkipToContentLinkOwnProps,
} from './ISkipToContentLinkOwnProps';
import {
  UrlLink,
} from '../UrlLink';

import styles from './index.less';

import * as React from 'react';

export const SkipToContentLink: React.FunctionComponent<ISkipToContentLinkOwnProps> = ({
  children,
  className,
  href,
  tabIndex,
  ...otherProps
}) => (
  <UrlLink
    {...otherProps}
    className={classNames(
      styles.skipToContentLink,
      'skipToContentLink',
      className,
    )}

    href={href || getDefaultSkipToContentHref()}
    tabIndex={tabIndex || 1}
  >{
    children || (children && Array.isArray(children) && children.length) ?
      children :
      'Skip to content'
  }</UrlLink>
);
