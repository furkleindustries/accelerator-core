import {
  INamed,
} from '../../interfaces/INamed';
import {
  ISerializedEpistemology,
} from '../epistemology/ISerializedEpistemology';
import {
  ISerializedModel,
} from '../models/ISerializedModel';
import {
  ITag,
} from '../../tags/ITag';

export interface ISerializedWorld extends INamed {
  readonly knowledge: ISerializedEpistemology;
  readonly models: ISerializedModel[];
  readonly tags: ITag[];
}
