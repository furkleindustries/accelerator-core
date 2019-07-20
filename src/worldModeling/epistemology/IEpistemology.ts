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
  Type extends ModelType,
  Being extends ModelType,
  Knowledge extends ModelType,
> {
  readonly awareness: IAwarenessRelation<Type, Being, Knowledge>;
  readonly tags: ReadonlyArray<Tag>;
  readonly thoughts: IThoughtRelation<Type, Being, Knowledge>;
  readonly world: IWorld;
  readonly addTag: (tag: Tag) => void;
  readonly removeTag: (tag: Tag) => void;
  readonly clone: () => IEpistemology<Type, Being, Knowledge>;
  readonly destroy: () => void;
  readonly finalize: (self: IEpistemology<Type, Being, Knowledge>) => void;
  readonly initialize: (self: IEpistemology<Type, Being, Knowledge>) => void;
}
