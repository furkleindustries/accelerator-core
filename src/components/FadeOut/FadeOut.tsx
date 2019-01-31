import {
  IFadeOutOwnProps,
} from './IFadeOutOwnProps';
import {
  assert,
} from 'ts-assertions';

import * as React from 'react';

import styles from './FadeOut.scss';

export const strings = {
  DURATION_NOT_GREATER_THAN_OR_EQUAL_TO_ZERO_NUMBER:
    'The duration argument passed to a Delay component was not a number ' +
    'greater than zero.',
};

export class FadeOut extends React.PureComponent<IFadeOutOwnProps> {
  public render() {
    const {
      children,
      className,
      duration,
    } = this.props;

    assert(
      !(duration >= 0),
      strings.DURATION_NOT_GREATER_THAN_OR_EQUAL_TO_ZERO_NUMBER,
    );

    return (
      <div
        className={`${styles.fadeOut} fadeOut${className ? ` ${className}` : ''}`}
        style={{
          animationDuration: `${duration}ms`
        }}
      >
        {children}
      </div>
    );
  }
}
