import {
  EpistemicTypes,
} from './EpistemicTypes';
import {
  IAwarenessRelation,
} from '../relations/IAwarenessRelation';
import {
  ISerializedEpistemology,
} from './ISerializedEpistemology';
import {
  ITag,
} from '../../tags/ITag';
import {
  IThoughtRelation,
} from '../relations/IThoughtRelation';
import {
  IWorld,
} from '../world/IWorld';
import {
  ModelType,
} from '../models/ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  Tag,
} from '../../tags/Tag';

export interface IEpistemology<
  Type extends EpistemicTypes | ModelType.Thought,
  /* This reflects knowledge *of*, not types which are capable of knowledge. */
  Knowledge extends ModelType = ModelType,
> {
  /* Thoughts may not be "aware" of anything. Models must have ontology in
   * order to be aware and for something to be aware of them, given that
   * awareness is considered an epistemic perspective of ontic aspects. */
  readonly awareness: Type extends EpistemicTypes & OnticTypes ?
    IAwarenessRelation<Type, Knowledge> :
    null;

  readonly modelType: Type;
  readonly tags: ReadonlyArray<ITag>;
  readonly thoughts: IThoughtRelation<Type, Knowledge>;
  readonly type: symbol;
  readonly world: IWorld;
  readonly addTag: (tag: Tag) => void;
  readonly clone: () => IEpistemology<Type, Knowledge>;
  readonly destroy: () => void;
  readonly getTag: (toSearch: Tag) => ITag | null;
  readonly removeTag: (tag: Tag) => void;
  readonly serialize: (
    self: IEpistemology<Type, Knowledge>,
    spaces?: number,
  ) => string;

  readonly serializeToObject: (
    self: IEpistemology<Type, Knowledge>,
  ) => ISerializedEpistemology;

  readonly finalize?: (self: IEpistemology<Type, Knowledge>) => void;
  readonly initialize?: (self: IEpistemology<Type, Knowledge>) => void;
}
