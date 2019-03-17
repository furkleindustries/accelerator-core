import {
  Tag,
} from './Tag';

export const getTag = (tags: ReadonlyArray<Tag> | undefined, key: string) => {
  if (!Array.isArray(tags)) {
    return null;
  }

  for (const tag of tags) {
    if (tag && typeof tag === 'string' && tag === key) {
      return true;
    } else if ((tag as any).key === key) {
      return tag;
    }
  }

  return null;
};
