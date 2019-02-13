import {
  Button as MuiButton,
} from '@material-ui/core';

import * as React from 'react';

export class Button extends React.PureComponent {
  render() {
    const { children } = this.props;

    return (
      <MuiButton>
        {children}
      </MuiButton>
    );
  }
}
