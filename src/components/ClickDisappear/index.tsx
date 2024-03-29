import classNames from 'classnames';
import {
  Clicker,
} from '../Clicker';
import {
  FadeOut,
} from '../FadeOut';
import {
  IClickDisappearOwnProps,
} from './IClickDisappearOwnProps';

import * as React from 'react';

export const ClickDisappear: React.FC<IClickDisappearOwnProps> = ({
  children,
  className,
  fadeOutDuration,
}) => {
  const after = fadeOutDuration! > 0 && fadeOutDuration! % 1 === 0 ?
    <FadeOut duration={fadeOutDuration!}>
      {children}
    </FadeOut> :
    null;

  return (
    <Clicker
      className={classNames('click-disappear', className)}
      contentAfterClick={after}
    >
      {children}
    </Clicker>
  );
};
