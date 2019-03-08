import {
  Tag,
} from '../tags/Tag';

export interface ITaggable {
  readonly tags?: ReadonlyArray<Tag>;
}
