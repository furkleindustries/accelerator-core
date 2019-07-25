import { BeingNoThoughtsBase } from './BeingNoThoughtsBase';
import {
  EpistemicTypes,
} from './EpistemicTypes';
import {
  IEpistemology,
} from './IEpistemology';
import {
  ModelType,
} from '../models/ModelType';
import {
  Tag,
} from '../../../lib/ink/inkjs/src/Tag';

export interface IEpistemologyConstructorArgs<
  Type extends EpistemicTypes | ModelType.Thought,
  Being extends BeingNoThoughtsBase,
  Knowledge extends ModelType,
> {
  readonly modelType: Type;
  readonly tags?: Tag[] | ReadonlyArray<Tag>;
  readonly finalizer?: (self: IEpistemology<Type, Being, Knowledge>) => void;
  readonly initializer?: (self: IEpistemology<Type, Being, Knowledge>) => void; 
}
