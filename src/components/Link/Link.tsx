import {
  getPassagesMap,
} from '../../passages/getPassagesMap';
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
  constructor(props: any) {
    super(props);
    this.navigate = this.navigate.bind(this);
  }

  public render() {
    const {
      children,
      className,
      passageName,
    } = this.props;

    return (
      <button
        className={`link${className ? ` ${className}` : ''}`}
        passage-name={passageName}
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
      getPassagesMap().passagesMap[passageName],
      strings.PASSAGE_DOES_NOT_EXIST.replace('%NAME%', passageName),
    );

    navigate({
      dispatch,
      passageName,
      tags,
    });
  }
}

export const mapDispatchToProps: MapDispatchToProps<ILinkDispatchProps, ILinkOwnProps> = (dispatch: Dispatch) => ({
  dispatch,
}); 

export const Link = connect(null, mapDispatchToProps)(LinkUnconnected);
