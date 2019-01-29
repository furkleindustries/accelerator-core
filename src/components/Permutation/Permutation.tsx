import {
  IPermutationOwnProps,
} from './IPermutationOwnProps';
import {
  IPermutationState,
} from './IPermutationState';

// tslint:disable
const arrayShuffle: (arr: any[]) => any[] = require('array-shuffle');
// tslint:enable

import * as React from 'react';

export class Permutation extends React.Component<IPermutationOwnProps, IPermutationState> {
  public state = { shuffled: [] };

  public componentDidMount() {
    const {
      children,
      pick,
    } = this.props;

    const arr = arrayShuffle(React.Children.toArray(children));
    this.setState({ shuffled: arr.slice(0, pick || arr.length) });
  }

  public render() {
    return this.state.shuffled;
  }
}
