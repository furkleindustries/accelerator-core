import {
  INOfOwnProps,
} from './INOfOwnProps';
import {
  INOfState,
} from './INOfState';
import {
  assert,
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

// tslint:disable
const arrayShuffle: (arr: any[]) => any[] = require('array-shuffle');
// tslint:enable

export const strings = {
  N_NOT_POSITIVE_INTEGER:
    'The `n` prop, passed to the NOf component, was not a positive integer.',

  SHUFFLED_INVALID:
    'The `shuffled` state value '
};

export class NOf extends React.PureComponent<INOfOwnProps, INOfState> {
  public state = {
    index: 0,
    shuffled: undefined,
  };

  public componentDidMount() {
    const {
      children,
      n,
      shuffle,
    } = this.props;

    assert(n >= 1 && n % 1 === 0, strings.N_NOT_POSITIVE_INTEGER);

    const childArray = React.Children.toArray(children);
    const len = childArray.length;
    const max = len - n - 1;
    const min = 0;
    this.setState({
      index: Math.floor(Math.random() * (max - min + 1) + min),
      ...(
        shuffle === true ?
          { shuffled: arrayShuffle(childArray) }:
          {}
      ),
    });
  }
  
  public render() {
    const {
      children,
      n,
      shuffle,
    } = this.props;

    const {
      index,
      shuffled,
    } = this.state;

    return (
      shuffle === true ?
        assertValid<React.ReactNodeArray>(
          shuffled,
          strings.SHUFFLED_INVALID,
        ) :
        children
    ).slice(index, index + n);
  }
}
