import {
  Tag,
} from './Tag';

export const strings = {
  TAGS_INVALID:
    'The tags argument passed to the getTag function was not an array.',
}

export const getTag = (tags: Tag[], key: string) => {
  if (!Array.isArray(tags)) {
    throw new Error(strings.TAGS_INVALID);
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

export default getTag;
