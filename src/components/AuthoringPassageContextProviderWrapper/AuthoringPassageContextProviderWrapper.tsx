import {
  getAuthoringPassageContext,
} from '../../context/getAuthoringPassageContext';
import {
  IAuthoringPassageContextProviderWrapperOwnProps,
} from './IAuthoringPassageContextProviderWrapperOwnProps';

import * as React from 'react';

export const AuthoringPassageContextProviderWrapper: React.FunctionComponent<IAuthoringPassageContextProviderWrapperOwnProps> = ({
  children,
  value,
}) => {
  return React.createElement(
    getAuthoringPassageContext(value).Provider,
    { value },
    children,
  );
}
