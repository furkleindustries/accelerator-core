import {
  INOfOwnProps,
} from './INOfOwnProps';
import {
  INOfState,
} from './INOfState';

import * as React from 'react';

export const strings = {
  N_NOT_POSITIVE_INTEGER:
    'The `n` prop, passed to the NOf component, was not a positive integer.',
};

export class NOf extends React.PureComponent<INOfOwnProps, INOfState> {
  public state = {
    index: 0,
  }

  public componentDidMount() {
    const {
      n,
      children,
    } = this.props;

    if (!(n >= 1 && n % 1 === 0)) {
      throw new Error(strings.N_NOT_POSITIVE_INTEGER);
    }

    const len = React.Children.toArray(children).length;
    const max = len - n - 1;
    const min = 0;
    this.setState({
      index: Math.floor(Math.random() * (max - min + 1) + min),
    });
  }
  
  public render() {
    const {
      children,
      n,
    } = this.props;

    const {
      index,
    } = this.state;

    return React.Children.toArray(children).slice(index, index + n);
  }
}
