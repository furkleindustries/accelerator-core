import {
  ActionTypes,
} from '../../actions/ActionTypes';
import {
  createCurrentPassageNameAction,
} from '../../actions/creators/createCurrentPassageNameAction';
import {
  createPassageHistoryAction,
} from '../../actions/creators/createPassageHistoryAction';
import {
  createStoryStateAction,
} from '../../actions/creators/createStoryStateAction';
import {
  getTag,
} from '../../tags/getTag';
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

export const strings = {
  NO_LINKING_TO_NORENDER_PASSAGES:
    'You cannot link to a passage tagged noRender.',

  PASSAGE_INVALID:
    'The passage referenced by the passageName prop, %NAME%, does not exist ' +
    'in the passages map.',
}

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
  
  private formatTags() {
    const {
      passage,
    } = this.props;

    return ((passage || {}).tags || []).map((aa: Tag) => (
      typeof aa === 'object' ? JSON.stringify(aa) : aa
    )).join('');
  }

  private navigate() {
    const {
      passage,
      passageName,
      changePassage,
    } = this.props;

    if (!passage) {
      const errStr = strings.PASSAGE_INVALID.replace('%NAME%', passageName);
      throw new Error(errStr);
    } else if (passage.tags && getTag(passage.tags, 'noRender')) {
      throw new Error(strings.NO_LINKING_TO_NORENDER_PASSAGES);
    }

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

export const mapDispatchToProps: MapDispatchToProps<ILinkDispatchProps, ILinkOwnProps & ILinkStateProps> = (dispatch: Dispatch, props) => ({
  changePassage() {
    const {
      passageName,
    } = props;

    /* Update the current passage name. */
    dispatch(createCurrentPassageNameAction(passageName));

    /* Add a new instance to the passage history. */
    dispatch(createPassageHistoryAction(ActionTypes.PassageHistoryNew, {
      name: passageName,
      linkTags: props.tags || [],
    }));

    /* Add a new instance to the story state. This new passage will have all
     * the same state as the prior passage did when leaving it. */ 
    dispatch(createStoryStateAction(ActionTypes.StoryStateNew));
  },
}); 

export const LinkConnected = connect(mapStateToProps, mapDispatchToProps)(Link);

export default LinkConnected;