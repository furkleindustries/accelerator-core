export const intersperse = (arr: any[], sep: string) => {
  if (!arr.length) {
    return [];
  }

  return arr.slice(1).reduce(
    (xs, x) => xs.concat([ sep, x ]),
    [ arr[0] ],
  );
};
