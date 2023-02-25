import classNames from 'classnames';
import {
  IFadeOutOwnProps,
} from './IFadeOutOwnProps';
import {
  assert,
} from 'ts-assertions';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const strings = {
  DURATION_NOT_GREATER_THAN_OR_EQUAL_TO_ZERO_NUMBER:
    'The duration argument passed to a FadeOut component was not a number ' +
      'greater than or equal to zero.',
};

export const FadeOut: React.FC<IFadeOutOwnProps> = ({
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
      className={classNames(
        builtIns['fade-out'],
        'fade-out',
        className,
      )}

      role="group"
      style={{ animationDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};
