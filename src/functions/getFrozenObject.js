export function getFrozenObject(...sources) {
  return Object.freeze(Object.assign({}, ...sources));
}
