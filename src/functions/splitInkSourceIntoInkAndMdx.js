export const splitInkSourceIntoInkAndMdx = (source) => {
  const inkMdxRe = new RegExp(/\/\*\s*@mdx\s*((?:.|\s)+)\*\//, 'g');
  const returns = [];
  let beginIndex = 0;
  let match;
  while (1) {
    match = inkMdxRe.exec(source);
    if (!match) {
      break;
    }

    const thisIndex = match.index;
    if (thisIndex > beginIndex) {
      returns.push({
        text: source.slice(beginIndex, thisIndex),
        type: 'ink',
      });
    }

    returns.push({
      text: match[1],
      type: 'mdx',
    });

    beginIndex = inkMdxRe.lastIndex;
  }

  if (!beginIndex) {
    returns.push({
      text: source,
      type: 'ink',
    });
  } else if (beginIndex < source.length) {
    returns.push({
      text: source.slice(beginIndex, source.length),
      type: 'ink',
    });
  }

  return returns;
};
