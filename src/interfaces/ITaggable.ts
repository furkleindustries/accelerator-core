import {
  MaybeReadonlyArray,
} from '../typeAliases/MaybeReadonlyArray';
import {
  Tag,
} from '../tags/Tag';

export interface ITaggable {
  readonly tags?: MaybeReadonlyArray<Tag>;
}
