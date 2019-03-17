export const strings = {
  CONTENT_INVALID:
    'The header object\'s content property was not a function.',

  CONTENT_MISSING:
    'The header object had no content element.',

  NAME_MISSING:
    'The header object had no name string.',

  HEADER_INVALID:
    'The header argument was not an object.',
};

/* This function returns an error string if the header fails, and null if it is
 * a normal header object. */
export function checkHeaderObject(header: any): null {
  if (!header || typeof header !== 'object') {
    throw new Error(strings.HEADER_INVALID);
  }

  if (!header.name || typeof header.name !== 'string') {
    throw new Error(strings.NAME_MISSING);
  }

  if (!header.content) {
    throw new Error(strings.CONTENT_MISSING);
  } else if (typeof header.content !== 'function') {
    throw new Error(strings.CONTENT_INVALID);
  }

  return null;
}
