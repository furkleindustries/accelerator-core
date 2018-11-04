import {
  IFadeOutOwnProps,
} from './IFadeOutOwnProps';

import * as React from 'react';

// @ts-ignore
import _styles from './FadeOut.scss';
const styles = _styles || {};

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

    if (!(duration >= 0)) {
      throw new Error(strings.DURATION_NOT_GREATER_THAN_OR_EQUAL_TO_ZERO_NUMBER);
    }

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
