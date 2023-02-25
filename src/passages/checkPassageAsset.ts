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
  CONTENT_INVALID:
    'The passage object\'s content property was not a function.',

  CONTENT_MISSING:
    'The passage object had no content element.',

  NAME_MISSING:
    'The passage object had no name string.',

  PASSAGE_INVALID:
    'The passage argument was not an object.',

  TAGS_INVALID:
    'The passage object\'s tags property was not an array.',
};

/* This function returns an error string if the passage fails, and true if it is
 * a normal passage object. */
export function checkPassageAsset(passage: any): passage is IPassage {
  const {
    content,
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

  /* Don't test for content if it's a NoRender passage. */
  if (!tags || !getTag(tags, BuiltInTags.NoRender)) {
    assert(content, strings.CONTENT_MISSING);
    assert(typeof content === 'function', strings.CONTENT_INVALID);
  }

  return true;
}
