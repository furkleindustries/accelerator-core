import {
  BeingNoThoughtsBase,
} from './BeingNoThoughtsBase';
import {
  EpistemicTypes,
} from './EpistemicTypes';
import {
  IAwarenessRelation,
} from '../relations/IAwarenessRelation';
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
  Tag,
} from '../../tags/Tag';

export interface IEpistemology<
  Type extends EpistemicTypes | ModelType.Thought,
  Being extends BeingNoThoughtsBase,
  /* This reflects knowledge *of*, not types which are capable of knowledge. */
  Knowledge extends ModelType,
> {
  /* Thoughts may not be "aware" of anything. */
  readonly awareness: Type extends EpistemicTypes ?
    IAwarenessRelation<Type, Being, Knowledge> :
    null;

  readonly tags: ReadonlyArray<string | Tag>;
  readonly type: Symbol | 'Epistemology';
  readonly thoughts: IThoughtRelation<Type, Being, Knowledge>;
  readonly world: IWorld;
  readonly addTag: (tag: string | Tag) => void;
  readonly removeTag: (tag: string | Tag) => void;
  readonly clone: () => IEpistemology<Type, Being, Knowledge>;
  readonly destroy: () => void;
  readonly finalize: (self: IEpistemology<Type, Being, Knowledge>) => void;
  readonly initialize: (self: IEpistemology<Type, Being, Knowledge>) => void;
}
