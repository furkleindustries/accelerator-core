import {
  BuiltInTags,
} from '../tags/BuiltInTags';
import {
  createCurrentPassageNameAction,
} from '../actions/creators/createCurrentPassageNameAction';
import {
  createPassageHistoryNewAction,
} from '../actions/creators/createPassageHistoryNewAction';
import {
  createStoryStateNewAction,
} from '../actions/creators/createStoryStateNewAction';
import {
  getPassagesMap,
} from '../passages/getPassagesMap';
import {
  getTag,
} from '../tags/getTag';
import {
  IAction,
} from '../actions/IAction';
import {
  Dispatch,
} from 'redux';
import {
  Tag,
} from '../tags/Tag';

export const strings = {
  NO_LINKING_TO_NORENDER_PASSAGES:
    'You cannot link to a passage tagged noRender.',

  PASSAGE_INVALID:
    'No passage could be produced from the passageName argument passed to ' +
    'navigate.',

  PASSAGE_NAME_INVALID:
    'The passageName argument was not passed to navigate, was not a string, ' +
    'or was empty.',
};

export const navigate = ({
  dispatch,
  passageName,
  tags,
}: {
  dispatch: Dispatch<IAction>,
  passageName: string,
  tags?: Tag[],
}) => {
  if (!passageName || typeof passageName !== 'string') {
    throw new Error(strings.PASSAGE_NAME_INVALID); 
  }

  const {
    passagesMap,
  } = getPassagesMap();

  const passage = passagesMap[passageName];
  if (!passage) {
    throw new Error(strings.PASSAGE_INVALID);
  } else if (getTag(passage.tags, BuiltInTags.NoRender)) {
    throw new Error(strings.NO_LINKING_TO_NORENDER_PASSAGES);
  }

  /* Update the current passage name. */
  dispatch(createCurrentPassageNameAction(passageName));

  /* Add a new instance to the passage history. */
  dispatch(createPassageHistoryNewAction({
    name: passageName,
    linkTags: tags || [],
  }));

  /* Add a new instance to the story state. This new passage will have all
   * the same state as the prior passage did when leaving it. */ 
  dispatch(createStoryStateNewAction());
};
