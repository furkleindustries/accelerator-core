import {
  Tag,
} from './Tag';

export const getStructuredTags = (tags: Tag[]) => tags.map((tag) => (
  typeof tag === 'string' ?
  {
    key: tag,
    value: true,
  } :
  tag
));
