import {
  Tag,
} from './Tag';

const tagObjAreEqual = (a: any, b: any) => (
  a &&
    b &&
    a.key &&
    b.key &&
    a.key === b.key &&
    a.value &&
    b.value &&
    a.value === b.value 
);

export const getTag = (
  tags: Array<string | Tag> | ReadonlyArray<string | Tag> | null | undefined,
  toSearch: string | Tag,
) => {
  if (!Array.isArray(tags)) {
    return null;
  }

  const filtered = tags.filter(Boolean);

  for (const tag of filtered) {
    if (typeof tag === 'string') {
      if (tag === toSearch || tag === (toSearch as any).key) {
        return toSearch;
      }
    } else {
      if (typeof toSearch === 'string') {
        if (tag.key === toSearch) {
          return toSearch;
        }
      } else if (tagObjAreEqual(tag, toSearch)) {
        return toSearch;
      }
    }
  }

  return null;
};
