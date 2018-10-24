import {
  IFadeOutOwnProps,
} from './IFadeOutOwnProps';
import {
  IFadeOutState,
} from './IFadeOutState';

import * as React from 'react';

// @ts-ignore
import _styles from './FadeOut.scss';
const styles = _styles || {};

export const strings = {
  DURATION_NOT_GREATER_THAN_ZERO_NUMBER:
    'The duration argument passed to a Delay component was not a number ' +
    'greater than zero.',
};

export class FadeOut extends React.Component<IFadeOutOwnProps, IFadeOutState> {
  public state = {
    fadeOut: false,
  }

  public componentDidMount() {
    /* Trigger the transition immediately after mounting. */
    setTimeout(() => this.setState({ fadeOut: true, }));
  }

  public render() {
    const {
      children,
      className,
      duration,
    } = this.props;

    const {
      fadeOut,
    } = this.state;

    if (!(duration > 0)) {
      throw new Error(strings.DURATION_NOT_GREATER_THAN_ZERO_NUMBER);
    }

    return (
      <span
        className={`${styles.fadeOut} fadeOut${className ? ` ${className}` : ''}`}
        style={{
          opacity: fadeOut ? 0 : 1,
          transition: `opacity ${duration}ms`
        }}
      >
        {children}
      </span>
    );
  }
}

export default FadeOut;
