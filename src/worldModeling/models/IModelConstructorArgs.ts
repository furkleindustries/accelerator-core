import {
  IEpistemology,
} from './IEpistemology';
import {
  IOntology,
} from './IOntology';
import {
  ModelType,
} from './ModelType';
import {
  Tag,
} from '../../tags/Tag';

export interface IModelConstructorArgs<T extends ModelType, B extends T = T, K extends T = T> {
  readonly name: string;
  readonly type: T;
  readonly being?: IOntology<B>;
  readonly knowing?: IEpistemology<K>;
  readonly tags?: Tag[] | ReadonlyArray<Tag>;
}
