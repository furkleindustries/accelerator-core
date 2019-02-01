import {
  IClickerOwnProps,
} from './IClickerOwnProps';
import {
  IClickerState,
} from './IClickerState';

import * as React from 'react';

import styles from './Clicker.scss';

export class Clicker extends React.Component<IClickerOwnProps, IClickerState> {
  public state = {
    clicked: false,
  }

  constructor(props: any) {
    super(props);

    this.click = this.click.bind(this); 
  }
  
  public render() {
    const {
      children,
      className,
      contentAfterClick,
    } = this.props;

    const {
      clicked,
    } = this.state;

    const maybeOnClick = clicked ? {} : { onClick: this.click, };

    return (
      <div
        className={`${styles.clicker} clicker${className ? ` ${className}` : ''}`}
        {...maybeOnClick}  
      >
        {clicked ?
          contentAfterClick :
          children}  
      }
      </div>
    );
  }

  private click() {
    this.setState({
      clicked: true,
    });
  }
}
