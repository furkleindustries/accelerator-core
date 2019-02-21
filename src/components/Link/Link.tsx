import {
  Button,
} from '../Button/Button';
import {
  getPassagesMapAndStartPassageNameContext,
} from '../context/getPassagesMapAndStartPassageNameContext';
import {
  ILinkDispatchProps,
} from './ILinkDispatchProps';
import {
  ILinkOwnProps,
} from './ILinkOwnProps';
import {
  navigate,
} from '../../state/navigate';
import {
  connect,
  MapDispatchToProps,
} from 'react-redux';
import {
  Dispatch,
} from 'redux';
import {
  assert,
} from 'ts-assertions';

import * as React from 'react';

export const strings = {
  PASSAGE_DOES_NOT_EXIST:
    'The passageName argument, %NAME%, does not match any passages within ' +
    'the passages map.',
};

export class LinkUnconnected extends React.PureComponent<
  ILinkOwnProps & ILinkDispatchProps
>
{
  public static contextType = getPassagesMapAndStartPassageNameContext();

  constructor(props: any) {
    super(props);
    this.doNavigation = this.doNavigation.bind(this);
  }

  public render() {
    const {
      children,
      className,
    } = this.props;

    return (
      <Button
        className={`link${className ? ` ${className}` : ''}`}
        onClick={this.doNavigation}
      >
        {children}
      </Button>
    );
  }

  private doNavigation() {
    const {
      dispatch,
      passageName,
      tags: linkTags,
    } = this.props;

    const {
      passagesMap: { [passageName]: passage },
    } = this.context;

    assert(
      passage,
      strings.PASSAGE_DOES_NOT_EXIST.replace('%NAME%', passageName),
    );

    navigate({
      dispatch,
      passage,
      linkTags,
    });
  }
}

export const mapDispatchToProps: MapDispatchToProps<
  ILinkDispatchProps,
  ILinkOwnProps
> = (dispatch: Dispatch) => ({ dispatch }); 

export const Link = connect(null, mapDispatchToProps)(LinkUnconnected);
