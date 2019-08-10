import {
  EpistemicTypes,
} from '../epistemology/EpistemicTypes';
import {
  IActorModelOptionalFunctions,
} from './IActorModelOptionalFunctions';
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
  Being extends OnticTypes = never,
  Knowledge extends ModelType = never,
> {
  readonly name: string;
  readonly type: Type;

  readonly actorFuncs?: Partial<IActorModelOptionalFunctions<Being, Knowledge>>;
  readonly being?: Type extends OnticTypes ? IOntology<Type, Being> : null;
  readonly knowledge?: Type extends EpistemicTypes ?
    IEpistemology<Type, Knowledge> :
    null;

  readonly tags?: Array<Tag> | ReadonlyArray<Tag>;
}
