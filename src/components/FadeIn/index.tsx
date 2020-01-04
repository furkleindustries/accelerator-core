import classNames from 'classnames';
import {
  IFadeInOwnProps,
} from './IFadeInOwnProps';
import {
  assert,
} from 'ts-assertions';

import * as React from 'react';

import styles from './index.less';

export const strings = {
  DURATION_NOT_GREATER_THAN_OR_EQUAL_ZERO_NUMBER:
    'The duration argument passed to a FadeIn component was not a number ' +
      'greater or equal to zero.',
};

export const FadeIn: React.FunctionComponent<IFadeInOwnProps> = ({
  children,
  className,
  duration,
}) => {
  assert(
    duration >= 0,
    strings.DURATION_NOT_GREATER_THAN_OR_EQUAL_ZERO_NUMBER,
  );

  return (
    <div
      className={classNames(styles.fadeIn, 'fadeIn', className)}
      style={{ animationDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};
