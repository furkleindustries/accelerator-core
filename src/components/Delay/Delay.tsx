import {
  IDelayOwnProps,
} from './IDelayOwnProps';
import {
  IDelayState,
} from './IDelayState';
import {
  assert,
} from 'ts-assertions';

import * as React from 'react';

export const strings = {
  TIMEOUT_NOT_GREATER_THAN_OR_EQUAL_TO_ZERO_NUMBER:
    'The timeout argument passed to a Delay component was not a number ' +
    'greater zero.',
};

export class Delay extends React.PureComponent<IDelayOwnProps, IDelayState> {
  public state = { shown: false };

  public componentDidMount() {
    const {
      timeout,
    } = this.props;

    assert(
      timeout > 0,
      strings.TIMEOUT_NOT_GREATER_THAN_OR_EQUAL_TO_ZERO_NUMBER,
    );

    setTimeout(() => this.setState({ shown: true }), timeout);
  }

  public render() {
    const {
      children,
      className,
      renderWithZeroOpacity,
    } = this.props;

    const { shown } = this.state;

    const classNameStr = `delay${className ? ` ${className}` : ''}`;

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
          style={{ opacity: 0 }}
        >
          {children}
        </div>
      )
    }
    
    return null;
  }
}
