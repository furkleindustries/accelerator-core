import {
  IEpistemology,
} from '../epistemology/IEpistemology';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  ModelType,
} from './ModelType';
import {
  Tag,
} from '../../tags/Tag';

export interface IModelConstructorArgs<
  Type extends ModelType,
  Being extends ModelType,
  Knowledge extends ModelType,
> {
  readonly name: string;
  readonly type: Type;
  readonly being?: IOntology<Type, Being, Knowledge> | null;
  readonly knowledge?: IEpistemology<Type, Being, Knowledge> | null;
  readonly tags?: Array<string | Tag> | ReadonlyArray<string | Tag>;
}
