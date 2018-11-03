export const strings = {
  CONTENTS_INVALID:
    'The header object\'s contents property were not an object or function.',

  CONTENTS_MISSING:
    'The header object had no contents element.',

  NAME_MISSING:
    'The header object had no name string.',

  HEADER_INVALID:
    'The header argument was not an object.',
};

/* This function returns an error string if the header fails, and null if it is
 * a normal header object. */
export const checkHeaderObject = (header: any): null => {
  if (!header || typeof header !== 'object') {
    throw new Error(strings.HEADER_INVALID);
  }

  if (!header.name || typeof header.name !== 'string') {
    throw new Error(strings.NAME_MISSING);
  }

  if (!header.contents) {
    throw new Error(strings.CONTENTS_MISSING);
  } else if (typeof header.contents !== 'object' &&
              typeof header.contents !== 'function') {
    throw new Error(strings.CONTENTS_INVALID);
  }

  return null;
}

export default checkHeaderObject;
