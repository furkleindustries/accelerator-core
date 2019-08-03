import {
  EpistemicTypes,
} from '../epistemology/EpistemicTypes';
import {
  IEpistemology,
} from '../epistemology/IEpistemology';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  ModelType,
} from './ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  Tag,
} from '../../tags/Tag';

export interface IModelConstructorArgs<
  Type extends ModelType,
  Being extends OnticTypes,
> {
  readonly name: string;
  readonly type: Type;

  readonly being?: Type extends OnticTypes ? IOntology<Type, Being> : null;
  readonly knowledge?: Type extends EpistemicTypes ?
    IEpistemology<Type, Being> :
    null;

  readonly tags?: Array<Tag> | ReadonlyArray<Tag>;
}
