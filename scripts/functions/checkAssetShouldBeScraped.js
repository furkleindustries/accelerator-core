import slash from 'slash';

// No path components anywhere in the chain starting with _, containing
// `.bundle`, `.manifest`, `.spec`, or `.test`, or ending without
// `.(j|t)sx`.

export const checkAssetShouldBeScraped = (rawFp) => {
  const filePath = slash(rawFp);

  return/\.[jt]sx$/gi.test(filePath) &&
    !/\/_/gi.test(filePath) &&
    !/(?:bundle|manifest|spec|test)\.[jt]sx$/gi.test(filePath)
};
