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

export class ClickDisappear extends React.PureComponent<IClickDisappearOwnProps> {
  public render() {
    const {
      children,
      className,
      fadeOutDuration,
    } = this.props;

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
  }
}
