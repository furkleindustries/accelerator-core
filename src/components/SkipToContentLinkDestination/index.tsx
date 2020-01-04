import classNames from 'classnames';
import {
  getDefaultSkipToContentHref,
} from '../../functions/getDefaultSkipToContentLinkHref';
import {
  ISkipToContentLinkDestinationOwnProps,
} from './ISkipToContentLinkDestinationOwnProps';
import {
  UrlLink,
} from '../UrlLink';

import * as React from 'react';

export const SkipToContentLinkDestination: React.FunctionComponent<ISkipToContentLinkDestinationOwnProps> = ({
  children,
  className,
  id,
  ...props
}) => (
  <UrlLink
    {...props}
    className={classNames('skipToContentLinkDestination', className)}
    id={
      /* Remove the hash from the href. */
      id || getDefaultSkipToContentHref().slice(1)
    }
  >{
    /* The @material-ui Link component requires a child but we don't want any content by default. */
    children ? children : ''
  }</UrlLink>
);
