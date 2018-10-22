import {
  IClickPrependProps,
} from './IClickPrependProps';
import {
  IClickPrependState,
} from './IClickPrependState';

import * as React from 'react';

export class ClickPrepend extends React.Component<IClickPrependProps, IClickPrependState> {
  public state = {
    prepended: false,
  }

  constructor(props: any) {
    super(props);

    this.prepend = this.prepend.bind(this);
  }

  public render() {
    const {
      children,
      toPrepend,
    } = this.props;

    const {
      prepended,
    } = this.state;

    return prepended ? [ toPrepend, children, ] : children;
  }

  private prepend() {
    this.setState({
      prepended: true,
    });
  }
}

export default ClickPrepend;
