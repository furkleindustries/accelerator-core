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

  constructor(props: any, context?: any) {
    super(props, context);

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
    } = this.props;

    const {
      index,
    } = this.state;
    
    const newIndex = index + 1 >= React.Children.toArray(children).length ? 0 : index + 1
    this.setState({
      index: newIndex,
    });
  }
}

export default Cycler;
