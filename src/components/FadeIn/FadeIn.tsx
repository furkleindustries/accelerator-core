import {
  IFadeInOwnProps,
} from './IFadeInOwnProps';

import * as React from 'react';

// @ts-ignore
import _styles from './FadeIn.scss';
const styles = _styles || {};

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

    if (!(duration >= 0)) {
      throw new Error(strings.DURATION_NOT_GREATER_THAN_ZERO_NUMBER);
    }

    return (
      <div
        className={`${styles.fadeIn} fadeIn${className ? ` ${className}` : ''}`}
        style={{
          animationDuration: `${duration}ms`,
        }}
      >
        {children}
      </div>
    );   
  }
}

export default FadeIn;
