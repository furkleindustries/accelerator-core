export const specialTags = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'menuitem',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
];

export const NO_WHITESPACE = [
  'table',
  'tbody',
  'tfoot',
  'thead',
  'tr',
];


export const canHaveChildren = (tagName: string) => {
  return specialTags.indexOf(tagName.toLowerCase()) === -1
};

export const canHaveWhitespace = (tagName: string) => {
  return NO_WHITESPACE.indexOf(tagName.toLowerCase()) !== -1
};
