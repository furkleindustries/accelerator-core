import {
  Button,
} from '../Button';
import classNames from 'classnames';
import {
  ICyclerOwnProps,
} from './ICyclerOwnProps';
import {
  ICyclerState,
} from './ICyclerState';
import {
  assert,
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

export class Cycler extends React.PureComponent<ICyclerOwnProps, ICyclerState> {
  public readonly state = { index: 0 };

  constructor(props: ICyclerOwnProps) {
    super(props);

    const startIndex = props.startIndex!;
    assert(
      !(startIndex < 0),
      'The startIndex prop passed to the Cycler component was below 0.',
    );

    if (startIndex > 0 && startIndex % 1 === 0) {
      assert(
        startIndex < props.children.length,
        'The startIndex prop passed to the Cycler component was greater ' +
          'than the highest index in the child array.',
      );
    }

    if (startIndex) {
      this.state = { index: startIndex };
    }
  } 
  
  public readonly render = () => {
    const {
      children,
      className,
    } = this.props;

    const { index } = this.state;

    return (
      <Button 
        className={classNames('cycler', className)}
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
