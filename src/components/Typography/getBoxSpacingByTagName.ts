const spacings = Object.freeze([
  4,
  2,
  1.5,
  1,
  0.5,
  0,
]);

export const getBoxSpacingByTagName = (tagName: string) => {  
  if (tagName && tagName.length === 2 && tagName[0].toLowerCase() === 'h') {
    return spacings[Number(tagName[1]) - 1] || 0;
  }

  return 0;
};
