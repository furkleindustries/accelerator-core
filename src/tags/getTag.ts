import {
  ITag,
} from './ITag';
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
  tags: Tag[] | readonly Tag[] | null | undefined,
  toSearch: string | Tag,
): ITag | null => {
  if (!Array.isArray(tags)) {
    return null;
  }

  for (const tag of tags.filter(Boolean)) {
    if (typeof tag === 'string') {
      if (tag === toSearch || tag === (toSearch as any).key) {
        return typeof toSearch === 'string' ?
          {
            key: toSearch,
            value: true,
          } :
          toSearch;
      }
    } else {
      if (typeof toSearch === 'string') {
        if (tag.key === toSearch) {
          return {
            key: toSearch,
            value: true,
          };
        }
      } else if (tagObjAreEqual(tag, toSearch)) {
        return toSearch;
      }
    }
  }

  return null;
};
