export const strings = {
  CONTENT_INVALID:
    'The footer object\'s content property was not a function.',

  CONTENT_MISSING:
    'The footer object had no content element.',

  NAME_MISSING:
    'The footer object had no name string.',

  FOOTER_INVALID:
    'The footer argument was not an object.',
};

/* This function returns an error string if the footer fails, and null if it is
 * a normal footer object. */
export const checkFooterObject = (footer: any): null => {
  if (!footer || typeof footer !== 'object') {
    throw new Error(strings.FOOTER_INVALID);
  }

  if (!footer.name || typeof footer.name !== 'string') {
    throw new Error(strings.NAME_MISSING);
  }

  if (!footer.content) {
    throw new Error(strings.CONTENT_MISSING);
  } else if (typeof footer.content !== 'function') {
    throw new Error(strings.CONTENT_INVALID);
  }

  return null;
}
