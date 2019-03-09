import {
  Clicker,
} from '../Clicker/Clicker';
import {
  FadeOut,
} from '../FadeOut/FadeOut';
import {
  IClickDisappearOwnProps,
} from './IClickDisappearOwnProps';

import * as React from 'react';

export const ClickDisappear: React.FunctionComponent<IClickDisappearOwnProps> = ({
  children,
  className,
  fadeOutDuration,
}) => {
  const maybeClassName = className ? { className, } : {};
  const after = fadeOutDuration! > 0 && fadeOutDuration! % 1 === 0 ?
    <FadeOut duration={fadeOutDuration!}>
      {children}
    </FadeOut> :
    null;

  return (
    <Clicker
      {...maybeClassName}
      contentAfterClick={after}
    >
      {children}
    </Clicker>
  );
};
