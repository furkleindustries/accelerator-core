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
  public state = {
    shuffled: [],
  };

  public componentDidMount() {
    const {
      children,
    } = this.props;

    this.setState({
      shuffled: arrayShuffle(React.Children.toArray(children)),
    });
  }

  public render() {
    const {
      shuffled,
    } = this.state;

    return shuffled;
  }
}
