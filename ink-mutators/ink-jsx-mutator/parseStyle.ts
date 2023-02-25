import {
  camelCase,
} from './camelCase';

export const parseStyle = (style: string | Record<string, string | number>) => {
  if (typeof style === 'string') {
    return style
      .split(';')
      .filter(Boolean)
      .reduce((map, rule) => {
        const name = rule.slice(0, rule.indexOf(':')).trim()
        const value = rule.slice(rule.indexOf(':') + 1).trim()

        return {
          ...map,
          [camelCase(name)]: value,
        };
      }, {});
  } else if (typeof style === 'object') {
    return style;
  }

  return null;
};
