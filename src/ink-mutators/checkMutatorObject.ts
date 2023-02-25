export const strings = {
  CONTENT_INVALID:
    'The mutator object\'s content property was not a function.',

  CONTENT_MISSING:
    'The mutator object had no content element.',

  NAME_MISSING:
    'The mutator object had no name string.',

  MUTATOR_INVALID:
    'The mutator argument was not an object.',
};

/* This function returns an error string if the mutator fails, and null if it is
 * a normal mutator object. */
export const checkMutatorObject = (mutator: any): null => {
  if (!mutator || typeof mutator !== 'object') {
    throw new Error(strings.MUTATOR_INVALID);
  }

  if (!mutator.name || typeof mutator.name !== 'string') {
    throw new Error(strings.NAME_MISSING);
  }

  if (!mutator.content) {
    throw new Error(strings.CONTENT_MISSING);
  } else if (typeof mutator.content !== 'function') {
    throw new Error(strings.CONTENT_INVALID);
  }

  return null;
}
