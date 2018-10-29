import {
  ActionTypes,
} from 'src/actions/ActionTypes';
import {
  createCurrentPassageNameAction,
} from 'src/actions/creators/createCurrentPassageNameAction';
import {
  createPassageHistoryAction,
} from 'src/actions/creators/createPassageHistoryAction';
import {
  createStoryStateAction,
} from 'src/actions/creators/createStoryStateAction';
import {
  getTag,
} from 'src/tags/getTag';
import {
  IAction,
} from 'src/actions/IAction';
import {
  IPassage,
} from 'src/passages/IPassage';
import {
  Dispatch,
} from 'redux';
import {
  Tag,
} from 'src/tags/Tag';

export const strings = {
  NO_LINKING_TO_NORENDER_PASSAGES:
    'You cannot link to a passage tagged noRender.',

  PASSAGE_INVALID:
    'The passage argument passed to navigate was not valid.',
};

export const navigate = ({
  dispatch,
  passage,
  tags,
}: {
  dispatch: Dispatch<IAction>,
  passage: IPassage,
  tags?: Tag[],
}) => {
  if (!passage || !passage.name) {
    throw new Error(strings.PASSAGE_INVALID);
  } else if (passage.tags && getTag(passage.tags, 'noRender')) {
    throw new Error(strings.NO_LINKING_TO_NORENDER_PASSAGES);
  }

  /* Update the current passage name. */
  dispatch(createCurrentPassageNameAction(passage.name));

  /* Add a new instance to the passage history. */
  dispatch(createPassageHistoryAction(ActionTypes.PassageHistoryNew, {
    name: passage.name,
    linkTags: tags || [],
  }));

  /* Add a new instance to the story state. This new passage will have all
   * the same state as the prior passage did when leaving it. */ 
  dispatch(createStoryStateAction(ActionTypes.StoryStateNew));
};

export default navigate;
