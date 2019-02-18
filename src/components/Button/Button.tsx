import {
  Button as MuiButton,
} from '@material-ui/core';
import {
  ButtonProps,
} from '@material-ui/core/Button';

import * as React from 'react';

export class Button extends React.PureComponent<ButtonProps> {
  public render() {
    return (
      <MuiButton {...this.props} />
    );
  }
}
