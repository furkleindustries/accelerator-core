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

/* This function returns an error string if the passage fails, and nothing
 * if it is a normal passage object. */
export const checkPassageObject = (passage: any) => {
  if (!passage || typeof passage !== 'object') {
    throw strings.PASSAGE_INVALID;
  }

  if (!passage.name || typeof passage.name !== 'string') {
    return strings.NAME_MISSING;
  }

  if (passage.tags && !Array.isArray(passage.tags)) {
    return strings.TAGS_INVALID;
  }

  if (!passage.contents) {
    throw new Error(strings.CONTENTS_MISSING);
  } else if (typeof passage.contents !== 'object' &&
             typeof passage.contents !== 'function') {
    throw new Error(strings.CONTENTS_INVALID);
  }

  return null;
}