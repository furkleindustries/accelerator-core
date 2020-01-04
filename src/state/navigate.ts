import {
  BuiltInTags,
} from '../tags/BuiltInTags';
import {
  createPassageNavigationAction,
} from '../actions/creators/createPassageNavigationAction';
import {
  getTag,
} from '../tags/getTag';
import {
  IAction,
} from '../actions/IAction';
import {
  IPassage,
} from '../passages/IPassage';
import {
  IPassageNavigationAction,
} from '../actions/IPassageNavigationAction';
import {
  MaybeReadonlyArray,
} from '../typeAliases/MaybeReadonlyArray';
import {
  Dispatch,
} from 'redux';
import {
  Tag,
} from '../tags/Tag';
import {
  assert,
} from 'ts-assertions';
import { getStructuredTags } from '../tags/getStructuredTags';

export const strings = {
  NO_NAVIGATING_TO_NO_RENDER_PASSAGES:
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
  passage,
  linkTags = [],
}: {
  dispatch: Dispatch<IAction>,
  passage: IPassage,
  linkTags?: MaybeReadonlyArray<Tag>,
}): IPassageNavigationAction => {
  assert(passage, strings.PASSAGE_INVALID);
  assert(
    !getTag(passage.tags, BuiltInTags.NoRender),
    strings.NO_NAVIGATING_TO_NO_RENDER_PASSAGES,
  );

  /* Update the current passage. */
  return dispatch(
    createPassageNavigationAction(passage, getStructuredTags(linkTags)),
  );
};
