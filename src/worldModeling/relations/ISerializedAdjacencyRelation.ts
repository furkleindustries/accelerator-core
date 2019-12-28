import {
  ITag,
} from '../../tags/ITag';
import {
  OnticTypes,
} from '../ontology/OnticTypes';

export interface ISerializedAdjacencyRelation {
  readonly modelType: OnticTypes;
  readonly neighbors: Record<string, string[]>;
  readonly tags: ITag[]
}
