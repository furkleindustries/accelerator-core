import {
  IOneOfProps,
} from './IOneOfProps';
import {
  IOneOfState,
} from './IOneOfState';

// @ts-ignore
import _styles from './OneOf.scss';
const styles = _styles || {};

import * as React from 'react';

export class OneOf extends React.PureComponent<IOneOfProps, IOneOfState> {
  public state = {
    index: 0,
  }

  public componentDidMount() {
    const {
      children,
    } = this.props;

    const len = React.Children.toArray(children).length;
    this.setState({
      index: Math.floor(Math.random() * len),
    });
  }
  
  public render() {
    const {
      children,
      className,
    } = this.props;

    const {
      index,
    } = this.state;

    return (
      <div className={`${styles.oneOf} oneOf${className ? ` ${className}` : ''}`}>
        {React.Children.toArray(children)[index]}
      </div>
    );
  }
}

export default OneOf;
