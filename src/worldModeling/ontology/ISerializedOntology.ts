import {
  ISerializedAdjacencyRelation,
} from '../relations/ISerializedAdjacencyRelation';
import {
  ISerializedContainmentRelation,
} from '../relations/ISerializedContainmentRelation';
import {
  ITag,
} from '../../tags/ITag';
import {
  OnticTypes,
} from './OnticTypes';

export interface ISerializedOntology {
  readonly adjacency: ISerializedAdjacencyRelation;
  readonly containment: ISerializedContainmentRelation | null;
  readonly modelType: OnticTypes;
  readonly tags: ITag[];
}
