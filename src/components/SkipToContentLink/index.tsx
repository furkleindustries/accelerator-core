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

import builtIns from '../../../passages/_global-styles/components/index.less';

import * as React from 'react';

const defaultSkipToContentHref = getDefaultSkipToContentHref();

export const SkipToContentLink: React.FC<ISkipToContentLinkOwnProps> = ({
  children,
  className,
  href,
  tabIndex = 1,
  ...otherProps
}) => (
  <UrlLink
    {...otherProps}

    className={classNames(
      builtIns['skip-to-content-link'],
      'skip-to-content-link',
      className,
    )}

    href={href || defaultSkipToContentHref}
    tabIndex={tabIndex}
  >{
    children || (children && Array.isArray(children) && children.length) ?
      children :
      'Skip to content'
  }</UrlLink>
);
