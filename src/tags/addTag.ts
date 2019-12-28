import {
  getStructuredTags,
} from './getStructuredTags';
import {
  getTag,
} from './getTag';
import {
  ITag,
} from './ITag';
import {
  Tag,
} from './Tag';
import {
  assert,
} from 'ts-assertions';

export const addTag = (
  tags: Tag[] | ReadonlyArray<Tag>,
  tag: Tag,
): ITag[] => {
  assert(
    Array.isArray(tags),
    'The tags argument provided to addTag was not an array.',
  );

  assert(
    tag && (typeof tag === 'string' || typeof tag === 'object'),
    'The tag argument provided to addTag was not a string or object of ' + 
      'signature ITag.',
  );

  let ret = [ ...tags ];
  if (!getTag(tags, tag)) {
    let val: ITag;
    if (typeof tag === 'string') {
      val = {
        key: tag,
        value: true, 
      };
    } else {
      val = tag;
    }
  
    ret = ret.concat([ val ]);
  }

  return getStructuredTags(ret);
};
