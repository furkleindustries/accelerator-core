import {
  IAuthoringPassageContextConsumerWrapperOwnProps,
} from './IAuthoringPassageContextConsumerWrapperOwnProps';

import * as React from 'react';

export const AuthoringPassageContextConsumerWrapper: React.FunctionComponent<IAuthoringPassageContextConsumerWrapperOwnProps> = ({
  children,
  ...props
}) => children({ ...props });
