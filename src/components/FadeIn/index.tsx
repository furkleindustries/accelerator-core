import classNames from 'classnames';
import {
  IFadeInOwnProps,
} from './IFadeInOwnProps';
import {
  assert,
} from 'ts-assertions';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const strings = {
  DURATION_NOT_GREATER_THAN_OR_EQUAL_ZERO_NUMBER:
    'The duration argument passed to a FadeIn component was not a number ' +
      'greater or equal to zero.',
};

export const FadeIn: React.FC<IFadeInOwnProps> = ({
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
      className={classNames(
        builtIns['fade-in'],
        'fade-in',
        className,
      )}

      role="group"
      style={{
        animationDuration: `${duration}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};
