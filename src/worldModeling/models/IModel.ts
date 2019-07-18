import {
  IEpistemology,
} from './IEpistemology';
import {
  ModelType,
} from './ModelType';
import {
  IOntology,
} from './IOntology';
import {
  IWorld,
} from './IWorld';
import {
  Tag,
} from '../../tags/Tag';

export interface IModel<T extends ModelType, B extends T = T, K extends T = T> {
  readonly being: IOntology<B> | null;
  readonly knowing: IEpistemology<K> | null;
  readonly name: string;
  readonly tags: ReadonlyArray<Tag>;
  readonly type: T;
  readonly world: IWorld;
  readonly addTag: (tag: Tag) => void;
  readonly removeTag: (tag: Tag) => void;
  readonly clone: () => IModel<T, B, K>;
}
