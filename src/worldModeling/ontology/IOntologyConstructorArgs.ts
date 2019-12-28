import {
  IOntology,
} from './IOntology';
import {
  ModelType,
} from '../models/ModelType';
import {
  OnticTypes,
} from './OnticTypes';
import {
  Tag,
} from '../../tags/Tag';

export interface IOntologyConstructorArgs<
  Type extends OnticTypes,
  Being extends OnticTypes,
> {
  readonly modelType: Type;
  readonly finalize?: (self: IOntology<Type, Being>) => void;
  readonly initialize?: (self: IOntology<Type, Being>) => void;
  readonly tags?: Tag[] | ReadonlyArray<Tag>;
}
