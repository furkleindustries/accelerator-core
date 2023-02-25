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
      'greater than or equal to zero.',
};

export class Delay extends React.PureComponent<IDelayOwnProps, IDelayState> {
  private timerId: any;

  public state: IDelayState = { shown: false };

  public componentDidMount = () => {
    const { timeout: raw } = this.props;

    const timeout = Number(raw);

    assert(
      timeout >= 0,
      strings.TIMEOUT_NOT_GREATER_THAN_OR_EQUAL_TO_ZERO_NUMBER,
    );

    this.timerId = setTimeout(() => this.setState({ shown: true }), timeout);
  };

  public render = () => {
    const {
      children,
      renderWithZeroOpacity,
    } = this.props;

    if (this.state.shown) {
      return (
        <>
          {children}
        </>
      );
    } else if (renderWithZeroOpacity === true) {
      return (
        <>
          <span style={{ opacity: 0 }}>{children}</span>
        </>
      )
    }
    
    return null;
  };

  readonly componentWillUnmount = () => {
    if (this.timerId) {
      clearTimeout(this.timerId);
      delete this.timerId;
    }
  };
}
