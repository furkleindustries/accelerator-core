import {
  Clicker,
} from '../Clicker/Clicker';
import {
  IClickPrependOwnProps,
} from './IClickPrependOwnProps';

import * as React from 'react';

export class ClickPrepend extends React.PureComponent<IClickPrependOwnProps> {
  public render() {
    const {
      children,
      className,
      toPrepend,
    } = this.props;

    return (
      <Clicker
        contentAfterClick={[ toPrepend, children, ]}
        {...(className ? { className } : {})}
      >
        {children}
      </Clicker>
    );
  }
}
