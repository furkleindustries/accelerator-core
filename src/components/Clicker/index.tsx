import {
  Button,
} from '../Button';
import classNames from 'classnames';
import {
  IClickerOwnProps,
} from './IClickerOwnProps';
import {
  IClickerState,
} from './IClickerState';

import * as React from 'react';

import styles from '../../../passages/_global-styles/components/index.less';

export class Clicker extends React.PureComponent<IClickerOwnProps, IClickerState> {
  public state = { clicked: false };

  public render = () => {
    const {
      children,
      className,
      contentAfterClick,
    } = this.props;

    const { clicked } = this.state;

    return (
      <Button
        className={classNames(styles.clicker, 'clicker', className)}
        {...(clicked ? {} : { onClick: this.clickHandler })}
      >
        {clicked ? contentAfterClick : children}
      </Button>
    );
  };

  private clickHandler = () => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick();
    }

    this.click();
  };

  private click = () => this.setState({ clicked: true });
}
