import {
  IPermutationProps,
} from './IPermutationProps';
import {
  IPermutationState,
} from './IPermutationState';

// tslint:disable
const arrayShuffle: (arr: any[]) => any[] = require('array-shuffle');
// tslint:enable

// @ts-ignore
import _styles from './Permutation.scss';
const styles = _styles || {};

import * as React from 'react';

export class Permutation extends React.PureComponent<IPermutationProps, IPermutationState> {
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
      className,
    } = this.props;

    const {
      shuffled,
    } = this.state;

    return (
      <div className={`${styles.permutation} permutation${className ? ` ${className}` : ''}`}>
        {shuffled}
      </div>
    );
  }
}

export default Permutation;
