import {
  assert,
} from 'ts-assertions';

export const getObjectValues = (obj) => {
  assert(obj, 'Object not valid.');
  return Object.keys(obj).map((aa) => obj[aa]);
};
