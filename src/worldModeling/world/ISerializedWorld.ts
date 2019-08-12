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
  readonly knowledge: ISerializedEpistemology;
  readonly name: string;
  readonly models: ISerializedModel[];
  readonly tags: ITag[];
}
