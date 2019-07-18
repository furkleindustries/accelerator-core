import {
  IAwarenessRelation,
} from '../relations/IAwarenessRelation';
import {
  IThoughtRelation,
} from '../relations/IThoughtRelation';
import {
  IWorld,
} from './IWorld';
import {
  ModelType,
} from './ModelType';
import {
  Tag,
} from '../../tags/Tag';

export interface IEpistemology<K extends ModelType> {
  readonly awareness: IAwarenessRelation<K>;
  readonly tags: ReadonlyArray<Tag>;
  readonly thoughts: IThoughtRelation<K>;
  readonly world: IWorld;
  readonly addTag: (tag: Tag) => void;
  readonly removeTag: (tag: Tag) => void;
  readonly clone: () => IEpistemology<K>;
}
