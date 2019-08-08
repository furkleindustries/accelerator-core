import {
  ISerializedEpistemology,
} from '../epistemology/ISerializedEpistemology';
import {
  ISerializedModel,
} from '../models/ISerializedModel';
import {
  ITag,
} from '../../tags/ITag';

export interface ISerializedWorld {
  readonly being: null;
  readonly knowledge: ISerializedEpistemology;
  readonly models: ISerializedModel[];
  readonly tags: ITag[];
}
