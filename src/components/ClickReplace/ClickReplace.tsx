import {
  Clicker,
} from '../Clicker/Clicker';
import {
  IClickReplaceOwnProps,
} from './IClickReplaceProps';

import * as React from 'react';

export class ClickReplace extends React.Component<IClickReplaceOwnProps> {
  public render() {
    const {
      children,
      className,
      replaceWith,
    } = this.props;
    
    const maybeClassName = className ? { className, } : {};
    
    return (
      <Clicker
        {...maybeClassName}
        contentAfterClick={replaceWith}
      >
        {children}
      </Clicker>
    );
  }
}

export default ClickReplace;
