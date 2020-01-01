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
  INamed,
} from '../../interfaces/INamed';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  ITaggable,
} from '../../interfaces/ITaggable';
import {
  ModelType,
} from './ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';

export interface IModelConstructorArgs<
  Type extends ModelType,
  Being extends OnticTypes = any,
  Knowledge extends ModelType = any,
> extends
  INamed,
  ITaggable
{
  readonly type: Type;
  readonly actorFuncs?: Partial<
    IActorModelOptionalFunctions<Being, Knowledge>
  >;

  readonly being?: Type extends OnticTypes ? IOntology<Type, Being> : null;
  readonly knowledge?: Type extends EpistemicTypes ?
    IEpistemology<Type, Knowledge> :
    null;
}
