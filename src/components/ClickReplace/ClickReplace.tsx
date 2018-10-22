import {
  IClickReplaceProps,
} from './IClickReplaceProps';
import {
  IClickReplaceState,
} from './IClickReplaceState';

import * as React from 'react';

export class ClickReplace extends React.Component<IClickReplaceProps, IClickReplaceState> {
  public state = {
    replaced: false,
  }

  constructor(props: any) {
    super(props);

    this.replace = this.replace.bind(this);
  }

  public render() {
    const {
      children,
      replaceWith,
    } = this.props;

    const {
      replaced,
    } = this.state;
    
    return replaced ? replaceWith : children;
  }

  private replace() {
    this.setState({
      replaced: true,
    });
  }
}

export default ClickReplace;
