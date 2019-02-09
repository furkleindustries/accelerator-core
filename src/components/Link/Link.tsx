import {
  getPassagesMapAndStartPassage,
} from '../../passages/getPassagesMapAndStartPassage';
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

import manifest from '../../../passages/passages-manifest';

import * as React from 'react';

export const strings = {
  PASSAGE_DOES_NOT_EXIST:
    'The passageName argument, %NAME%, does not match any passages within ' +
    'the passages map.',
};

const { passagesMap } = getPassagesMapAndStartPassage(manifest);

export class LinkUnconnected extends React.PureComponent<
  ILinkOwnProps & ILinkDispatchProps
>
{
  constructor(props: any) {
    super(props);
    this.navigate = this.navigate.bind(this);
  }

  public render() {
    const {
      children,
      className,
    } = this.props;

    return (
      <button
        className={`link${className ? ` ${className}` : ''}`}
        onClick={this.navigate}
      >
        {children}
      </button>
    );
  }

  private navigate() {
    const {
      dispatch,
      passageName,
      tags,
    } = this.props;

    assert(
      passagesMap[passageName],
      strings.PASSAGE_DOES_NOT_EXIST.replace('%NAME%', passageName),
    );

    navigate({
      dispatch,
      passageName,
      tags,
    });
  }
}

export const mapDispatchToProps: MapDispatchToProps<
  ILinkDispatchProps,
  ILinkOwnProps
> = (dispatch: Dispatch) => ({ dispatch }); 

export const Link = connect(null, mapDispatchToProps)(LinkUnconnected);
