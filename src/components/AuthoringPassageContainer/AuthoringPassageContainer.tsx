import {
  AuthoringPassageContextProviderWrapper,
} from '../AuthoringPassageContextProviderWrapper/AuthoringPassageContextProviderWrapper';
import {
  IAuthoringPassageContainerOwnProps,
} from './IAuthoringPassageContainerOwnProps';

import * as React from 'react';

export const AuthoringPassageContainer: React.FunctionComponent<IAuthoringPassageContainerOwnProps> = ({
  children,
  value,
}) => (
  <AuthoringPassageContextProviderWrapper value={value}>
    {children}
  </AuthoringPassageContextProviderWrapper>
);
