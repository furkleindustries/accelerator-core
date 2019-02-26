import {
  Clicker,
} from '../Clicker/Clicker';
import {
  IClickAppendOwnProps,
} from './IClickAppendOwnProps';

import * as React from 'react';

export class ClickAppend extends React.PureComponent<IClickAppendOwnProps> {
  public render() {
    const {
      className,
      children,
      toAppend,
    } = this.props;

    const maybeClassName = className ? { className } : {};

    return (
      <Clicker
        {...maybeClassName}
        contentAfterClick={[ children, toAppend, ]}
      >
        {children}
      </Clicker>
    );
  }
}
