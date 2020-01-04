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

import styles from './index.less';

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
        {...(clicked ? {} : { onClick: this.click })}
      >
        {clicked ? contentAfterClick : children}
      </Button>
    );
  };

  private click = () => this.setState({ clicked: true });
}
