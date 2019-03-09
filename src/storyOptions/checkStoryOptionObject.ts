import {
  IStoryOption,
} from './IStoryOption';
import {
  assert,
  assertValid,
} from 'ts-assertions';

export const strings = {
  CONTENT_INVALID:
    'The passage object\'s content property were not an object or function.',

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
export function checkStoryOptionObject(passage: any): passage is IStoryOption {
  const {
    content,
    name,
    tags,
  } = assertValid<IStoryOption>(
    passage,
    strings.PASSAGE_INVALID,
  );

  assert(name && typeof name === 'string', strings.NAME_MISSING);

  if (tags) {
    assert(Array.isArray(tags), strings.TAGS_INVALID);
  }

  assert(content, strings.CONTENT_MISSING);
  assert(typeof content === 'function', strings.CONTENT_INVALID);

  return true;
}
