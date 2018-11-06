import {
  Clicker,
} from '../Clicker/Clicker';
import {
  IClickPrependOwnProps,
} from './IClickPrependOwnProps';

import * as React from 'react';

export class ClickPrepend extends React.Component<IClickPrependOwnProps> {
  public render() {
    const {
      children,
      className,
      toPrepend,
    } = this.props;

    const maybeClassName = className ? { className, } : {};

    return (
      <Clicker
        {...maybeClassName}
        contentAfterClick={[ toPrepend, children, ]}
      >
        {children}
      </Clicker>
    );
  }
}
