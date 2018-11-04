import {
  IDelayOwnProps,
} from './IDelayOwnProps';
import {
  IDelayState,
} from './IDelayState';

import * as React from 'react';

// @ts-ignore
import _styles from './Delay.scss';
const styles = _styles || {};

export const strings = {
  TIMEOUT_NOT_GREATER_THAN_OR_EQUAL_TO_ZERO_NUMBER:
    'The timeout argument passed to a Delay component was not a number ' +
    'greater than or equal to zero.',
};

export class Delay extends React.Component<IDelayOwnProps, IDelayState> {
  public state = {
    shown: false,
  }

  public componentDidMount() {
    const {
      timeout,
    } = this.props;

    if (!(timeout >= 0)) {
      throw new Error(strings.TIMEOUT_NOT_GREATER_THAN_OR_EQUAL_TO_ZERO_NUMBER);
    }

    setTimeout(() => {
      this.setState({
        shown: true,
      });
    }, timeout);
  }

  public render() {
    const {
      children,
      className,
      renderWithZeroOpacity,
    } = this.props;

    const {
      shown,
    } = this.state;

    const classNameStr = `${styles.delay} delay${className ? ` ${className}` : ''}`;

    if (shown) {
      return (
        <div className={classNameStr}>
          {children}
        </div>
      );
    } else if (renderWithZeroOpacity) {
      return (
        <div
          className={classNameStr}
          style={{ opacity: 0, }}
        >
          {children}
        </div>
      )
    } else {
      return null;
    }
  }
}
