export const getNiceValueString = (value: any) => {
  if (Array.isArray(value)) {
    if (value.length > 1) {
      return JSON.stringify(value, null, 2);
    } else {
      return `[ ${JSON.stringify(value).slice(1, -1)} ]`;
    }
  } else if (value && typeof value === 'object') {
    if (Object.keys(value).length > 1) {
      return JSON.stringify(value, null, 2);
    } else {
      return `{ ${
        JSON.stringify(value, null, 2)
          .replace(/\n/g, '')
          .slice(3, -1)
      } }`;
    }
  }

  return String(value);
};
