import classNames from 'classnames';
import {
  getDefaultSkipToContentHref,
} from '../../functions/getDefaultSkipToContentLinkHref';
import {
  ISkipToContentLinkDestinationOwnProps,
} from './ISkipToContentLinkDestinationOwnProps';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const SkipToContentLinkDestination: React.FC<ISkipToContentLinkDestinationOwnProps> = ({
  className,
  id,
  ...props
}) => (
  <span
    {...props}

    className={classNames(
      builtIns['skip-to-content-link-destination'],
      'skip-to-content-link-destination',
      className,
    )}

    /* Remove the hash from the href. */
    id={id || getDefaultSkipToContentHref().slice(1)}
    tabIndex={-1}
  >
  </span>
);
