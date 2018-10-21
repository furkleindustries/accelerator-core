import {
  IOneOfState,
} from './IOneOfState';

import * as React from 'react';

export class OneOf extends React.PureComponent<IOneOfState> {
  public state = {
    index: 0,
  }

  public componentDidMount() {
    const {
      children,
    } = this.props;

    const len = React.Children.toArray(children).length;
    this.setState({
      index: Math.floor(Math.random() * len),
    });
  }
  
  public render() {
    const {
      children,
    } = this.props;

    const {
      index,
    } = this.state;

    return React.Children.toArray(children)[index];
  }
}

export default OneOf;
