import {
  BuiltInTags,
} from '../tags/BuiltInTags';
import {
  createPassageNavigationAction,
} from '../actions/creators/createPassageNavigationAction';
import {
  createPassageTimeAction,
} from '../actions/creators/createPassageTimeAction';
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
  IPassage,
} from '../passages/IPassage';
import {
  IPassageNavigationAction,
} from '../actions/IPassageNavigationAction';
import {
  Dispatch,
} from 'redux';
import {
  Tag,
} from '../tags/Tag';
import {
  assert,
  assertValid,
} from 'ts-assertions';

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

export function navigate({
  dispatch,
  passageName,
  tags,
}: {
  dispatch: Dispatch<IAction>,
  passageName: string,
  tags?: Tag[],
}): IPassageNavigationAction
{
  assert(
    passageName && typeof passageName === 'string',
    strings.PASSAGE_NAME_INVALID,
  );

  const {
    passagesMap,
  } = getPassagesMap();

  const passage = assertValid<IPassage>(
    passagesMap[passageName],
    strings.PASSAGE_INVALID,
  );

  assert(
    !getTag(passage.tags, BuiltInTags.NoRender),
    strings.NO_NAVIGATING_TO_NO_RENDER_PASSAGES,
  );

  /* Update the passage time. */
  dispatch(createPassageTimeAction());

  /* Update the current passage. */
  return dispatch(createPassageNavigationAction(passage, tags));
}
