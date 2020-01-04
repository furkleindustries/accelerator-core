import {
  EpistemicTypes,
} from './EpistemicTypes';
import {
  IEpistemology,
} from './IEpistemology';
import {
  ITaggable,
} from '../../interfaces/ITaggable';
import {
  ModelType,
} from '../models/ModelType';

export interface IEpistemologyConstructorArgs<
  Type extends EpistemicTypes | ModelType.Thought,
  Knowledge extends ModelType,
> extends ITaggable {
  readonly modelType: Type;
  readonly finalize?: (self: IEpistemology<Type, Knowledge>) => void;
  readonly initialize?: (self: IEpistemology<Type, Knowledge>) => void; 
}
