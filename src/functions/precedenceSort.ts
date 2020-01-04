export function precedenceSort<T extends { name: string }>(precedenceMap: {
  [key: string]: T[],
} & { none: T[] })
{
  /* Sort precedence in descending lexicographic order. In practice, this means
   * 4, 3, 2, 1, and then 'none' is always appended. */
  return Object.keys(precedenceMap).sort((aa, bb) => {
    if (aa === bb) {
      return 0;
    } else if (bb === 'none' || aa > bb) {
      return 1;
    }

    return -1;
  }).map((key) => (
    /* Sort each precedence in ascending lexicographic order. */
    precedenceMap[key].sort((aa, bb) => {
      if (aa.name === bb.name) {
        return 0;
      } else if (aa.name > bb.name) {
        return 1;
      }

      return -1;
    })
  )).reduce((prev, cur) => prev.concat(cur), []);  
}
