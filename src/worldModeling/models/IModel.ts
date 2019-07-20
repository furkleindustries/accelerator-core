import {
  IEpistemology,
} from '../epistemology/IEpistemology';
import {
  ModelType,
} from './ModelType';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  IWorld,
} from '../world/IWorld';
import {
  Tag,
} from '../../tags/Tag';

export interface IModel<
  Type extends ModelType,
  Being extends ModelType,
  Knowledge extends ModelType,
> {
  readonly being: IOntology<Type, Being, Knowledge> | null;
  readonly knowledge: IEpistemology<Type, Being, Knowledge> | null;
  readonly name: string;
  readonly tags: ReadonlyArray<string | Tag>;
  readonly type: Type;
  readonly world: IWorld;
  readonly addTag: (tag: string | Tag) => void;
  readonly clone: () => IModel<Type, Being, Knowledge>;
  readonly destroy: () => void;
  readonly removeTag: (tag: string | Tag) => void;
}
