import {
  AwareTypes,
} from '../relations/AwareTypes';
import {
  EpistemicTypes,
} from './EpistemicTypes';
import {
  IAwarenessRelation,
} from '../relations/IAwarenessRelation';
import {
  FindEpistemicArgs,
  IFindBaseArgs,
} from '../querying/FindModelArgs';
import {
  IModel,
} from '../models/IModel';
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
  Knowledge extends ModelType,
> {
  /* Thoughts may not be "aware" of anything. Models must have ontology in
   * order to be aware and for something to be aware of them, given that
   * awareness is considered an epistemic perspective of ontic aspects. */
  readonly awareness: Type extends AwareTypes ?
    IAwarenessRelation<Type, Knowledge> :
    null;

  readonly modelType: Type;
  readonly tags: ReadonlyArray<ITag>;
  readonly thoughts: IThoughtRelation<Type, Knowledge>;
  readonly type: symbol;
  readonly world: IWorld;
  readonly addTag: (tag: Tag) => void;
  readonly clone: (
    self: IEpistemology<Type, Knowledge>,
  ) => IEpistemology<Type, Knowledge>;

  readonly destroy: (
    self: IEpistemology<Type, Knowledge>,
  ) => void;

  readonly find: (
    args: string |
      (IFindBaseArgs<ModelType> &
        FindEpistemicArgs<EpistemicTypes, OnticTypes, Knowledge>),
  ) => IModel<ModelType, OnticTypes, Knowledge> | null;

  readonly findAll: (
    args: '*' |
      (IFindBaseArgs<ModelType> &
        FindEpistemicArgs<EpistemicTypes, OnticTypes, Knowledge>),
  ) => ReadonlyArray<IModel<ModelType, OnticTypes, Knowledge>>;

  readonly findAllGenerator: (
    args: '*' |
      (IFindBaseArgs<ModelType> &
        FindEpistemicArgs<EpistemicTypes, OnticTypes, Knowledge>),
  ) => IterableIterator<IModel<ModelType, OnticTypes, Knowledge>>;

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
