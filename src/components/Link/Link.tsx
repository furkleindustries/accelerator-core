import {
  getPassagesMap,
} from '../../functions/getPassagesMap';
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
  Tag,
} from '../../tags/Tag';

import * as React from 'react';

export const strings = {
  PASSAGE_DOES_NOT_EXIST:
    'The passageName argument, %NAME%, does not match any passages within ' +
    'the passages map.',
};

export class Link extends React.PureComponent<ILinkOwnProps & ILinkDispatchProps> {
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
      passageName,
      tags,
    } = this.props;

    const {
      passagesMap,
    } = getPassagesMap();

    const passage = passagesMap[passageName];
    if (!passage) {
      const errStr = strings.PASSAGE_DOES_NOT_EXIST.replace(
        '%NAME%',
        passageName
      );

      throw new Error(errStr);
    }

    navigate({
      dispatch,
      passage,
      tags,
    });
  }
  
  private formatTags() {
    const {
      passagesMap,
    } = getPassagesMap();

    const {
      passageName,
    } = this.props;

    const passage = passagesMap[passageName];
    return ((passage || {}).tags || []).map((aa: Tag) => (
      typeof aa === 'object' ? JSON.stringify(aa) : aa
    )).join('');
  }
}

export const mapDispatchToProps: MapDispatchToProps<ILinkDispatchProps, ILinkOwnProps> = (dispatch: Dispatch) => ({
  dispatch,
}); 

export const LinkConnected = connect(null, mapDispatchToProps)(Link);

export default LinkConnected;
