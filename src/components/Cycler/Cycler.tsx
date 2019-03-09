import {
  Button,
} from '../Button/Button';
import classnames from 'classnames';
import {
  ICyclerOwnProps,
} from './ICyclerOwnProps';
import {
  ICyclerState,
} from './ICyclerState';

import * as React from 'react';
import { assertValid } from 'ts-assertions';

export class Cycler extends React.PureComponent<ICyclerOwnProps, ICyclerState> {
  public readonly state = { index: 0 };
  
  public readonly render = () => {
    const {
      children,
      className,
    } = this.props;

    const { index } = this.state;

    return (
      <Button 
        className={classnames('cycler', className)}
        onClick={this.advance}
      >
        {React.Children.toArray(children)[index]}
      </Button>
    );
  };

  private readonly advance = () => {
    const {
      callback,
      children,
    } = this.props;

    const { index } = this.state;

    const childArray = React.Children.toArray(children);
    const newIndex = index + 1 >= childArray.length ? 0 : index + 1;
    this.setState({ index: newIndex });
    if (typeof callback === 'function') {
      callback(assertValid(childArray[newIndex]), newIndex);
    }
  };
}
