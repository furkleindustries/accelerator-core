import classNames from 'classnames';
import {
  IFadeOutOwnProps,
} from './IFadeOutOwnProps';
import {
  assert,
} from 'ts-assertions';

import * as React from 'react';

import styles from './index.less';

export const strings = {
  DURATION_NOT_GREATER_THAN_OR_EQUAL_TO_ZERO_NUMBER:
    'The duration argument passed to a FadeOut component was not a number ' +
      'greater than or equal to zero.',
};

export const FadeOut: React.FunctionComponent<IFadeOutOwnProps> = ({
  children,
  className,
  duration,
}) => {
  assert(
    duration >= 0,
    strings.DURATION_NOT_GREATER_THAN_OR_EQUAL_TO_ZERO_NUMBER,
  );

  return (
    <div
      className={classNames(styles.fadeOut, 'fadeOut', className)}
      style={{ animationDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};
