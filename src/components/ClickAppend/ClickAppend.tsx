import {
  IClickAppendProps,
} from './IClickAppendProps';
import {
  IClickAppendState,
} from './IClickAppendState';

import * as React from 'react';

export class ClickAppend extends React.Component<IClickAppendProps, IClickAppendState> {
  public state = {
    appended: false,
  }

  constructor(props: any) {
    super(props);

    this.append = this.append.bind(this);
  }

  public render() {
    const {
      children,
      toAppend,
    } = this.props;

    const {
      appended,
    } = this.state;
    
    return appended ? [ children, toAppend, ] : children;
  }

  private append() {
    this.setState({
      appended: true,
    });
  }
}

export default ClickAppend;
