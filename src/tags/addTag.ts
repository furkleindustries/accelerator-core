import {
  getTag,
} from './getTag';
import {
  Tag,
} from './Tag';

export const addTag = (
  tags: Array<string | Tag> | ReadonlyArray<string | Tag>,
  tag: string | Tag,
) => (
  !getTag(tags, tag) ?
    (tags || []).concat([ tag ]) :
    (tags || [])
);
