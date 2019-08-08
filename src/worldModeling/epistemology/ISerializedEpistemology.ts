import {
  EpistemicTypes,
} from './EpistemicTypes';
import {
  ISerializedAwarenessRelation,
} from '../relations/ISerializedAwarenessRelation';
import {
  ISerializedThoughtRelation,
} from '../relations/ISerializedThoughtRelation';
import {
  ITag,
} from '../../tags/ITag';
import {
  ModelType,
} from '../models/ModelType';

export interface ISerializedEpistemology {
  readonly awareness: ISerializedAwarenessRelation | null;
  readonly modelType: EpistemicTypes | ModelType.Thought;
  readonly tags: ITag[];
  readonly thoughts: ISerializedThoughtRelation;
}
