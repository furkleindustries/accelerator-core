import {
  INamed,
} from '../../interfaces/INamed';
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

export interface ISerializedModel extends INamed {
  readonly being: ISerializedOntology | null;
  readonly knowledge: ISerializedEpistemology | null;
  readonly tags: ITag[];
  readonly type: ModelType;
}
