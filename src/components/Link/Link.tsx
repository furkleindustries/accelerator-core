import {
  ILinkDispatchProps,
} from './ILinkDispatchProps';
import {
  ILinkStateProps,
} from './ILinkStateProps';
import {
  ILinkOwnProps,
} from './ILinkOwnProps';
import {
  IState,
} from '../../reducers/IState';
import {
  navigate,
} from '../../state/navigate';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import {
  Dispatch,
} from 'redux';
import {
  Tag,
} from '../../tags/Tag';

import * as React from 'react';

export class Link extends React.PureComponent<ILinkOwnProps & ILinkStateProps & ILinkDispatchProps> {
  constructor(props: any) {
    super(props);

    this.formatTags = this.formatTags.bind(this);
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
        data-tags={this.formatTags()}
        onClick={this.navigate}
      >
        {children}
      </button>
    );
  }

  private navigate() {
    const {
      dispatch,
      passage,
      tags,
    } = this.props;

    navigate({
      dispatch,
      passage,
      tags,
    });
  }
  
  private formatTags() {
    const {
      passage,
    } = this.props;

    return ((passage || {}).tags || []).map((aa: Tag) => (
      typeof aa === 'object' ? JSON.stringify(aa) : aa
    )).join('');
  }
}

export const mapStateToProps: MapStateToProps<ILinkStateProps, ILinkOwnProps, IState> = ({
  passages,
}, {
  passageName,
}) => ({
  passage: passages[passageName],
});

export const mapDispatchToProps: MapDispatchToProps<ILinkDispatchProps, ILinkOwnProps & ILinkStateProps> = (dispatch: Dispatch) => ({
  dispatch,
}); 

export const LinkConnected = connect(mapStateToProps, mapDispatchToProps)(Link);

export default LinkConnected;
