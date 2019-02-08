import {
  Clicker,
} from '../Clicker/Clicker';
import {
  IClickReplaceOwnProps,
} from './IClickReplaceProps';

import * as React from 'react';

export class ClickReplace extends React.PureComponent<IClickReplaceOwnProps> {
  public render() {
    const {
      children,
      className,
      replaceWith,
    } = this.props;

    return (
      <Clicker
        contentAfterClick={replaceWith}
        {...(className ? { className, } : {})}
      >
        {children}
      </Clicker>
    );
  }
}
