export const shouldEndQueryEarly = (
  andOrBehavior: 'and' | 'or',
  results: boolean[],
) => andOrBehavior === 'and' && !results[results.length - 1];
