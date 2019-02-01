import {
  IFadeInOwnProps,
} from './IFadeInOwnProps';
import {
  assert,
} from 'ts-assertions';

import * as React from 'react';

import styles from './FadeIn.scss';

export const strings = {
  DURATION_NOT_GREATER_THAN_ZERO_NUMBER:
    'The duration argument passed to a Delay component was not a number ' +
    'greater than zero.',
};

export class FadeIn extends React.PureComponent<IFadeInOwnProps> {
  public render() {
    const {
      children,
      className,
      duration,
    } = this.props;

    assert(
      !(duration >= 0),
      strings.DURATION_NOT_GREATER_THAN_ZERO_NUMBER,
    );

    return (
      <div
        className={`${styles.fadeIn} fadeIn${className ? ` ${className}` : ''}`}
        style={{ animationDuration: `${duration}ms` }}
      >
        {children}
      </div>
    );   
  }
}
