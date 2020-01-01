import {
  IOntology,
} from './IOntology';
import {
  ITaggable,
} from '../../interfaces/ITaggable';
import {
  OnticTypes,
} from './OnticTypes';

export interface IOntologyConstructorArgs<
  Type extends OnticTypes,
  Being extends OnticTypes,
> extends ITaggable {
  readonly modelType: Type;
  readonly finalize?: (self: IOntology<Type, Being>) => void;
  readonly initialize?: (self: IOntology<Type, Being>) => void;
}
