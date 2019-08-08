import {
  EpistemicTypes,
} from '../epistemology/EpistemicTypes';
import {
  IEpistemology,
} from '../epistemology/IEpistemology';
import {
  ModelType,
} from './ModelType';
import {
  IOntology,
} from '../ontology/IOntology';
import {
  ISerializedModel,
} from './ISerializedModel';
import {
  IWorld,
} from '../world/IWorld';
import {
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  ITag,
} from '../../tags/ITag';
import {
  Tag,
} from '../../tags/Tag';
import {
  TypedModelInterfaces,
} from './TypedModelInterfaces';

export interface IModel<
  /**
   * The abstract, conceptual type of the model, determining in the most basic
   * way what the model is, and what it may do.
   */
  Type extends ModelType,

  /**
   * The types to which the model will be able to ontically relate, assuming
   * its type permits any given relation.
   */
  Being extends OnticTypes = never,

  /**
   * The types to which the model will be able to epistemically relate,
   * assuming its type permits any given relation.
   */
  Knowledge extends ModelType = never,

  /**
   * The concrete model type produced by utility methods.
   */
  ModelInterface extends IModel<any, any, any> = TypedModelInterfaces<Being, Knowledge>[Type],
> {
  readonly being: Type extends OnticTypes ?
    IOntology<Type, Being> :
    null;

  /**
   * Note that Thought models are not included in the epistemic types. This is
   * because thought models are intended to be a thin affordance for globally
   * generic thoughts or concepts, and these models cannot "know" anything at
   * all.
   */
  readonly knowledge: Type extends EpistemicTypes ?
    IEpistemology<Type, Knowledge> :
    null;

  readonly name: string;
  readonly tags: ReadonlyArray<ITag>;
  readonly type: Type;
  readonly world: IWorld;

  readonly addTag: (tag: Tag) => void;
  readonly clone: () => ModelInterface;
  readonly destroy: () => void;
  readonly finalize: (self: IModel<Type, Being, Knowledge>) => void;
  readonly getTag: (toSearch: Tag) => ITag | null;
  readonly initialize: (self: IModel<Type, Being, Knowledge>) => void;
  readonly removeTag: (toSearch: Tag) => void;

  readonly serialize: (
    self: IModel<Type, Being, Knowledge>,
    spaces?: number,
  ) => string;

  readonly serializeToObject: (
    self: IModel<Type, Being, Knowledge>,
    spaces?: number,
  ) => ISerializedModel;
}
