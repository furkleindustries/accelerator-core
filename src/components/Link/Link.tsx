import {
  createCurrentPassageNameAction,
} from '../../actions/creators/createCurrentPassageNameAction';
import {
  createLastLinkTagsAction,
} from '../../actions/creators/createLastLinkTagsAction';
import {
  getTag,
} from '../../functions/getTag';
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

// @ts-ignore
import _styles from './Link.scss';
const styles = _styles || {};

export const strings = {
  NO_LINKING_TO_NORENDER_PASSAGES:
    'You cannot link to a passage tagged noRender.',

  PASSAGE_INVALID:
    'The passage referenced by the passageName prop, %NAME%, does not exist ' +
    'in the passages map.',
}

export class LinkUnconnected extends React.PureComponent<ILinkOwnProps & ILinkStateProps & ILinkDispatchProps> {
  constructor(props: any, context?: any) {
    super(props, context);

    this.formatTags = this.formatTags.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  public render() {
    const {
      children,
      passageName,
    } = this.props;

    return (
      <button
        className={`${styles.link} link`}
        passage-name={passageName}
        data-tags={this.formatTags()}
        onClick={this.navigate}
      >
        {children}
      </button>
    );
  }
  
  private formatTags() {
    const {
      passage,
    } = this.props;

    return ((passage || {}).tags || []).map((aa: Tag) => (
      typeof aa === 'object' ? JSON.stringify(aa) : aa)
    ).join('');
  }

  private navigate() {
    const {
      passage,
      passageName,
      changePassage,
      setLastLinkTags,
    } = this.props;

    if (!passage) {
      const errStr = strings.PASSAGE_INVALID.replace('%NAME%', passageName);
      
      throw new Error(errStr);
    } else if (passage.tags && getTag(passage.tags, 'noRender')) {
      throw new Error(strings.NO_LINKING_TO_NORENDER_PASSAGES);
    }

    setLastLinkTags();
    changePassage();
  }
}

export const mapStateToProps: MapStateToProps<ILinkStateProps, ILinkOwnProps, IState> = ({
  passages,
}, {
  passageName,
}) => ({
  passage: passages[passageName],
});

export const mapDispatchToProps: MapDispatchToProps<ILinkDispatchProps, ILinkOwnProps> = (dispatch: Dispatch, ownProps: ILinkOwnProps) => ({
  changePassage() {
    return dispatch(createCurrentPassageNameAction(ownProps.passageName));
  },

  setLastLinkTags() {
    return dispatch(createLastLinkTagsAction(ownProps.tags || []));
  },
}); 

export const Link = connect(mapStateToProps, mapDispatchToProps)(LinkUnconnected);

export default Link;