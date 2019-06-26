import classnames from 'classnames';
import {
  IFadeInOwnProps,
} from './IFadeInOwnProps';
import {
  assert,
} from 'ts-assertions';

import * as React from 'react';

import styles from './FadeIn.less';

export const strings = {
  DURATION_NOT_GREATER_THAN_ZERO_NUMBER:
    'The duration argument passed to a Delay component was not a number ' +
    'greater than zero.',
};

export const FadeIn: React.FunctionComponent<IFadeInOwnProps> = ({
  children,
  className,
  duration,
}) => {
  assert(
    !(duration >= 0),
    strings.DURATION_NOT_GREATER_THAN_ZERO_NUMBER,
  );

  return (
    <div
      className={classnames('fadeIn', styles.fadeIn, className)}
      style={{ animationDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};
