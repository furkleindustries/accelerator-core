import {
  BuiltInTags,
} from '../tags/BuiltInTags';
import {
  getTag,
} from '../tags/getTag';
import {
  IPassage,
} from './IPassage';
import {
  assert,
  assertValid,
} from 'ts-assertions';

export const strings = {
  CONTENTS_INVALID:
    'The passage object\'s contents property were not an object or function.',

  CONTENTS_MISSING:
    'The passage object had no contents element.',

  NAME_MISSING:
    'The passage object had no name string.',

  PASSAGE_INVALID:
    'The passage argument was not an object.',

  TAGS_INVALID:
    'The passage object\'s tags property was not an array.',
};

/* This function returns an error string if the passage fails, and true if it is
 * a normal passage object. */
export function checkPassageObject(passage: any): passage is IPassage {
  const {
    contents,
    name,
    tags,
  } = assertValid<IPassage>(
    passage,
    strings.PASSAGE_INVALID,
  );

  assert(name && typeof name === 'string', strings.NAME_MISSING);
  if (tags) {
    assert(Array.isArray(tags), strings.TAGS_INVALID);
  }

  /* Don't test for contents if it's a noRender passage. */
  if (!tags || !getTag(tags, BuiltInTags.NoRender)) {
    assert(contents, strings.CONTENTS_MISSING);
    assert(/^function|object$/.test(typeof contents), strings.CONTENTS_INVALID);
  }

  return true;
}
