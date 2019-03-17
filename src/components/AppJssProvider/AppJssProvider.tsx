import {
  create,
} from 'jss';
import {
  createGenerateClassName,
  jssPreset,
} from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  assertValid,
} from 'ts-assertions';

import * as React from 'react'; 

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: assertValid<HTMLElement>(
    document.querySelector('#jss-insertion-point'),
    'The #jss-insertion-point element could not be found.',
  ),
});

export const AppJssProvider: React.FunctionComponent = ({ children }) => (
  <JssProvider
    jss={jss}
    generateClassName={generateClassName}
  >
    {children}
  </JssProvider>
);
