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

export interface IEpistemology<T extends ModelType> {
  readonly awareness: IAwarenessRelation<T>;
  readonly tags: ReadonlyArray<Tag>;
  readonly thoughts: IThoughtRelation<T>;
  readonly world: IWorld;
  readonly addTag: (tag: Tag) => void;
  readonly removeTag: (tag: Tag) => void;
}
