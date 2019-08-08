import {
  EpistemicTypes,
} from '../epistemology/EpistemicTypes';
import {
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  ITag,
} from '../../tags/ITag';

export interface ISerializedAwarenessRelation {
  readonly modelType: EpistemicTypes & OnticTypes;
  readonly perceptions: string[];
  readonly tags: ITag[];
}
