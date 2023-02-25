import {
  Chip,
} from '../Chip';
import {
  IBreadcrumbOwnProps,
} from './IBreadcrumbOwnProps';

import * as React from 'react';

export const Breadcrumb: React.FC<IBreadcrumbOwnProps> = ({
  children,
  crumb: {
    logo,
    logoAlt,
    name,
    title,
  },

  ...props
}) => (
  <Chip
    {...props}
    label={title || name || 'Previous'}
    {...(logo ? { avatar: <img src={logo} alt={logoAlt} /> }  : {})}
  />
);
