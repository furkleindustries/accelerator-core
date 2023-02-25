import {
  valueHasMultipleItems,
} from './valueHasMultipleItems';
import {
  valueIsNonNullObject,
} from './valueIsNonNullObject';
import {
  valueIsStringifiable,
} from './valueIsStringifiable';

export const getNiceValueString = (value: any, tabSize = 4) => {
  if (Array.isArray(value)) {
    if (valueHasMultipleItems(value)) {
      return JSON.stringify(value, null, tabSize);
    }

    return `[ ${JSON.stringify(value).slice(1, -1)} ]`;
  } else if (valueIsNonNullObject(value)) {
    if (Object.keys(value).length > 1) {
      return JSON.stringify(value, null, tabSize);
    }

    return `{${
      JSON.stringify(value, null, tabSize)
        .replace(/\n/g, '')
        .slice(tabSize, -1)
    } }`;
  } else if (valueIsStringifiable(value)) {
    return value.toString();
  }

  return String(value);
};
