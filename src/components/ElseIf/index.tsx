import {
  IfProps,
} from '../If/IfProps';

import * as React from 'react';

/**
 * Has a condition prop, but doesn't use it in rendering, because all the logic
 * involved in "else-if" is performed by the parent `If` component in its
 * render step.
 */
export const ElseIf: React.FunctionComponent<IfProps> = ({ children }) => (
  <>{children}</>
);
