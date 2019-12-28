import {
  ISerializedEpistemology,
} from '../epistemology/ISerializedEpistemology';
import {
  ISerializedOntology,
} from '../ontology/ISerializedOntology';
import {
  ITag,
} from '../../tags/ITag';
import {
  ModelType,
} from './ModelType';

export interface ISerializedModel {
  readonly being: ISerializedOntology | null;
  readonly knowledge: ISerializedEpistemology | null;
  readonly name: string;
  readonly tags: ITag[];
  readonly type: ModelType;
}
