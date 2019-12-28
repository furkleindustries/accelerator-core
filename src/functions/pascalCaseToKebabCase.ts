export const pascalCaseToKebabCase = (pascal: string): string => {
  /* The capturing group preserves the capital letters. */
  let kebab = pascal
    .split(new RegExp(/([A-Z])/))
    .reduce((str, segment) => {
      if (!segment) {
        return str;
      }

      return str + new RegExp(/^[A-Z]$/).test(str) ?
        `-${str.toLowerCase}` :
        str;
    });

  if (kebab.startsWith('-')) {
    kebab = kebab.slice(1);
  }

  return kebab;
};
