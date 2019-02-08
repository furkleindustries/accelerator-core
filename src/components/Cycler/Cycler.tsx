import {
  ICyclerOwnProps,
} from './ICyclerOwnProps';
import {
  ICyclerState,
} from './ICyclerState';

import * as React from 'react';

export class Cycler extends React.PureComponent<ICyclerOwnProps, ICyclerState> {
  public state = { index: 0 };

  constructor(props: any) {
    super(props);
    this.advance = this.advance.bind(this);
  }
  
  public render() {
    const {
      children,
      className,
    } = this.props;

    const { index } = this.state;

    return (
      <button 
        className={`cycler${className ? ` ${className}` : ''}`}
        onClick={this.advance}
      >
        {React.Children.toArray(children)[index]}
      </button>
    );
  }

  private advance() {
    const {
      callback,
      children,
    } = this.props;

    const { index } = this.state;

    const childArray = React.Children.toArray(children);
    const newIndex = index + 1 >= childArray.length ? 0 : index + 1;
    this.setState({ index: newIndex });
    if (typeof callback === 'function') {
      callback(childArray[newIndex], newIndex);
    }
  }
}
