import {
  getStructuredTags,
} from './getStructuredTags';
import {
  getTag,
} from './getTag';
import {
  Tag,
} from './Tag';
import {
  assert,
} from 'ts-assertions';

export const removeTag = (
  tags: Tag[] | ReadonlyArray<Tag>,
  tag: Tag,
) => {
  assert(
    Array.isArray(tags),
    'The tags argument provided to removeTag was not an array.',
  );

  assert(
    tag && (typeof tag === 'string' || typeof tag === 'object'),
    'The tag argument provided to removeTag was invalid.',
  );

  let index = -1;
  if (getTag(tags, tag)) {
    tags.find((thisTag) => {
      index += 1;
      if (typeof thisTag === 'string') {
        if (typeof tag === 'string') {
          return thisTag === tag;
        } else {
          return thisTag === tag.key;
        }
      } else {
        if (typeof tag === 'string') {
          return thisTag.key === tag;
        } else {
          return Boolean(getTag([ tag ], thisTag));
        }
      }
    });
  }

  const sliced = tags.slice(0, index).concat(tags.slice(index));

  return getStructuredTags(sliced);
};
