import {
  EpistemicTypes,
} from './EpistemicTypes';
import {
  IEpistemology,
} from './IEpistemology';
import {
  ITag,
} from '../../tags/ITag';
import {
  ModelType,
} from '../models/ModelType';
import {
  Tag,
} from '../../../lib/ink/inkjs/src/Tag';

export interface IEpistemologyConstructorArgs<
  Type extends EpistemicTypes | ModelType.Thought,
  Knowledge extends ModelType,
> {
  readonly modelType: Type;
  readonly tags?: Tag[] | ReadonlyArray<Tag> | readonly (string | ITag)[];
  readonly finalize?: (self: IEpistemology<Type, Knowledge>) => void;
  readonly initialize?: (self: IEpistemology<Type, Knowledge>) => void; 
}
