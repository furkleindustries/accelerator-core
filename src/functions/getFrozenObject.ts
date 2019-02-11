export function getFrozenObject<T extends object>(...sources: T[]): Readonly<T> {
  return Object.freeze(Object.assign({}, ...sources));
}
