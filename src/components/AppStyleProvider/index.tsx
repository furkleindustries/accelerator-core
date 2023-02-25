import {
  StylesProvider,
} from '@material-ui/core/styles';

import * as React from 'react';

export const AppStyleProvider: React.FC = ({ children }) => (
  <StylesProvider injectFirst={true}>
    {children}
  </StylesProvider>
);
