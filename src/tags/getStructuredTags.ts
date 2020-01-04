import {
  ITag,
} from './ITag';
import {
  Tag,
} from './Tag';

export const getStructuredTags = (
  tags: Tag[] | readonly Tag[],
): readonly ITag[] => Object.freeze(
  (tags as Tag[]).map((key) => (
    typeof key === 'string' ?
      {
        key,
        value: true,
      } :
      key
  ))
);
