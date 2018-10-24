import {
  IClickerOwnProps,
} from './IClickerOwnProps';
import {
  IClickerState,
} from './IClickerState';

import * as React from 'react';

// @ts-ignore
import _styles from './Clicker.scss';
const styles = _styles || {};

export class Clicker extends React.Component<IClickerOwnProps, IClickerState> {
  state = {
    clicked: false,
  }

  constructor(props: any) {
    super(props);

    this.click = this.click.bind(this); 
  }
  
  render() {
    const {
      children,
      className,
      contentAfterClick,
    } = this.props;

    const {
      clicked,
    } = this.state;

    return (
      <div
        className={`${styles.clicker} clicker${className ? ` ${className}` : ''}`}
        onClick={clicked ? () => {} : this.click}
      >
        {clicked ?
          contentAfterClick :
          children}  
      }
      </div>
    );
  }

  click() {
    this.setState({
      clicked: true,
    });
  }
}

export default Clicker;
