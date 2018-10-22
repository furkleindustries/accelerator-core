import {
  ICyclerOwnProps,
} from './ICyclerOwnProps';
import {
  ICyclerState,
} from './ICyclerState';

// @ts-ignore
import _styles from './Cycler.scss';
const styles = _styles || {};

import * as React from 'react';

export class Cycler extends React.Component<ICyclerOwnProps, ICyclerState> {
  public state = {
    index: 0,
  }

  constructor(props: any) {
    super(props);

    this.advance = this.advance.bind(this);
  }
  
  public render() {
    const {
      children,
      className,
    } = this.props;

    const {
      index,
    } = this.state;

    return (
      <button 
        className={`${styles.cyclingLink} cyclingLink${className ? ` ${className}` : ''}`}
        onClick={this.advance}
      >
        {React.Children.toArray(children)[index]}
      </button>
    );
  }

  private advance() {
    const {
      children,
      notifyOfChange,
    } = this.props;

    const {
      index,
    } = this.state;

    const childArray = React.Children.toArray(children);
    const newIndex = index + 1 >= childArray.length ? 0 : index + 1
    this.setState({
      index: newIndex,
    });

    if (typeof notifyOfChange === 'function') {
      notifyOfChange(childArray[newIndex], newIndex);
    }
  }
}

export default Cycler;
