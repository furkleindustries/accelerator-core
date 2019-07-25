import {
  Tag,
} from '../tags/Tag';

export interface ITaggable {
  readonly tags?: Tag[] | ReadonlyArray<Tag>;
}
