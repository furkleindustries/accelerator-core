export const strings = {
  CONTENTS_INVALID:
    'The footer object\'s contents property were not an object or function.',

  CONTENTS_MISSING:
    'The footer object had no contents element.',

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

  if (!footer.contents) {
    throw new Error(strings.CONTENTS_MISSING);
  } else if (typeof footer.contents !== 'object' &&
              typeof footer.contents !== 'function') {
    throw new Error(strings.CONTENTS_INVALID);
  }

  return null;
}

export default checkFooterObject;
