import {
  IFadeInProps,
} from './IFadeInProps';
import {
  IFadeInState,
} from './IFadeInState';

import * as React from 'react';

// @ts-ignore
import _styles from './FadeIn.scss';
const styles = _styles || {};

export const strings = {
  DURATION_NOT_GREATER_THAN_ZERO_NUMBER:
    'The duration argument passed to a Delay component was not a number ' +
    'greater than zero.',
};

export class FadeIn extends React.Component<IFadeInProps, IFadeInState> {
  public state = {
    fadeIn: false,
  }

  public componentDidMount() {
    /* Trigger the transition immediately after mounting. */
    setTimeout(() => this.setState({ fadeIn: true, }));
  }

  public render() {
    const {
      children,
      className,
      duration,
    } = this.props;

    const {
      fadeIn,
    } = this.state;

    if (!(duration > 0)) {
      throw new Error(strings.DURATION_NOT_GREATER_THAN_ZERO_NUMBER);
    }

    return (
      <span
        className={`${styles.fadeIn} fadeIn${className ? ` ${className}` : ''}`}
        style={{
          opacity: fadeIn ? 1 : 0,
          transition: `opacity ${duration}ms`
        }}
      >
        {children}
      </span>
    );   
  }
}

export default FadeIn;
