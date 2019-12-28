import {
  addTag,
} from '../../tags/addTag';
import {
  AwarenessRelation,
} from '../relations/AwarenessRelation';
import {
  AwareTypes,
} from '../relations/AwareTypes';
import {
  EpistemicTypes,
} from './EpistemicTypes';
import {
  EpistemologyType,
} from './EpistemologyType';
import {
  getStructuredTags,
} from '../../tags/getStructuredTags';
import {
  getTag,
} from '../../tags/getTag';
import {
  IAwarenessRelation,
} from '../relations/IAwarenessRelation';
import {
  IEpistemology,
} from './IEpistemology';
import {
  IEpistemologyConstructorArgs,
} from './IEpistemologyConstructorArgs';
import {
  FindEpistemicArgs,
  IFindBaseArgs,
  FindAwarenessArgs,
} from '../querying/FindModelArgs';
import {
  IModel,
} from '../models/IModel';
import {
  isAwareType,
} from '../typeGuards/isAwareType';
import {
  ISerializedEpistemology,
} from './ISerializedEpistemology';
import {
  isEpistemicType,
} from '../typeGuards/isEpistemicType';
import {
  ITag,
} from '../../tags/ITag';
import {
  IThoughtRelation,
} from '../relations/IThoughtRelation';
import {
  IWorld,
} from '../world/IWorld';
import {
  ModelType,
} from '../models/ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  removeTag,
} from '../../tags/removeTag';
import {
  Tag,
} from '../../tags/Tag';
import {
  assertValid,
} from 'ts-assertions';

export class Epistemology<
  Type extends EpistemicTypes | ModelType.Thought,
  Knowledge extends ModelType,
> implements IEpistemology<Type, Knowledge> {
  /* Thoughts may not be "aware" of anything. Other types need both ontic and
   * epistemic aspects in order to be aware. */
  private readonly __awareness: Type extends EpistemicTypes & OnticTypes ?
    IAwarenessRelation<Type, Knowledge> :
    null;

  public get awareness() {
    return this.__awareness;
  }

  private readonly __modelType: Type;
  public get modelType() {
    return this.__modelType;
  }

  private __tags: ReadonlyArray<ITag> = Object.freeze([]);
  public get tags() {
    return this.__tags;
  } 

  private readonly __type: symbol = EpistemologyType;
  public get type() {
    return this.__type;
  } 

  private readonly __thoughts: IThoughtRelation<Type, Knowledge>;
  public get thoughts() {
    return this.__thoughts;
  }

  private readonly __world: IWorld;
  public get world() {
    return this.__world;
  }

  constructor(world: IWorld, args: IEpistemologyConstructorArgs<Type, Knowledge>) {
    this.__world = assertValid(world);

    const {
      finalize,
      initialize,
      modelType,
      tags,
    } = assertValid<IEpistemologyConstructorArgs<Type, Knowledge>>(args);

    this.__modelType = assertValid<Type>(
      modelType,
      'The value of the modelType argument did not meet the isModelType ' +
        'type guard.',

      isEpistemicType,
    );

    if (isAwareType(this.modelType)) {
      // @ts-ignore
      this.__awareness = (
        new AwarenessRelation<AwareTypes, Knowledge>(
          this.world,
          { modelType: this.modelType },
        )
      );
    }

    if (tags) {
      this.__tags = getStructuredTags(assertValid<Tag[]>(
        tags,
        'The tags argument to the Epistemology constructor was not valid.',
        Array.isArray,
      ));
    }

    if (typeof finalize === 'function') {
      this.finalize = finalize;
    }

    if (typeof initialize === 'function') {
      this.initialize = initialize;
      this.initialize(this);
    }
  }

  public readonly addTag = (tag: Tag) => (
    void (this.__tags = Object.freeze(addTag(this.tags, tag)))
  );

  public readonly clone = (
    self: IEpistemology<Type, Knowledge>,
  ): IEpistemology<Type, Knowledge> => {
    const copy = Object.assign(
      Object.create(Object.getPrototypeOf(self)),
      self,
    );

    copy.__awareness = self.awareness ?
      self.awareness.clone(self.awareness!) :
      null;

    copy.finalize = typeof self.finalize === 'function' ? self.finalize : null;

    copy.initialize = typeof self.initialize === 'function' ?
      self.initialize :
      null;

    copy.__thoughts = self.thoughts ?
      self.thoughts.clone(self.thoughts) :
      null;

    copy.world = self.world;

    return copy;
  };

  public readonly destroy = (
    self: IEpistemology<Type, Knowledge>,
  ) => {
    if (typeof self.finalize === 'function') {
      self.finalize(self);
    }

    if (self.awareness) {
      self.awareness.destroy(self.awareness!);
    }

    self.thoughts.destroy(self.thoughts);

    self.tags.forEach(self.removeTag);

    ((self: any) => {
      delete self.__awareness;
      delete self.awareness;
      delete self.finalize;
      delete self.initialize;
      delete self.__thoughts;
      delete self.thoughts;
      delete self.__tags;
      delete self.tags;
    })(self);
  };
  
  
  public readonly find = (
    args: string |
      (IFindBaseArgs<ModelType> &
        FindEpistemicArgs<EpistemicTypes, OnticTypes, Knowledge>),
  ): IModel<ModelType, OnticTypes, Knowledge> | null => this.findAllGenerator(
    typeof args === 'string' ?
      {
        name: args,
      } as IFindBaseArgs<ModelType> &
        FindEpistemicArgs<EpistemicTypes, OnticTypes, Knowledge> :

      args,
  ).next().value || null;

  public readonly findAll = (
    args: '*' |
      (IFindBaseArgs<ModelType> &
          FindEpistemicArgs<EpistemicTypes, OnticTypes, Knowledge>),
  ): ReadonlyArray<IModel<ModelType, OnticTypes, Knowledge>> => {
    const ret = [];
    for (const model of this.findAllGenerator(args)) {
      ret.push(model);
    }

    return ret;
  };

  readonly findAllGenerator = ((self: IEpistemology<Type, Knowledge>) => function* (
    args: '*' |
      (IFindBaseArgs<ModelType> &
        FindEpistemicArgs<EpistemicTypes, OnticTypes, Knowledge>),
  ): IterableIterator<IModel<ModelType, OnticTypes, Knowledge>>
  {
    if (self.awareness && isAwareType(self.modelType)) {
      yield* self.awareness.findAllGenerator(
        args as IFindBaseArgs<OnticTypes> &
          FindAwarenessArgs<AwareTypes, OnticTypes>,
      );
    }

    yield* self.thoughts.findAllGenerator(args);
  })(this);

  public readonly getTag = (toSearch: Tag) => getTag(this.tags, toSearch);

  public readonly removeTag = (tag: Tag) => (
    void (this.__tags = Object.freeze(removeTag(this.tags, tag)))
  );

  public readonly serialize = (
    self: IEpistemology<Type, Knowledge>,
    spaces: number = 0,
  ) => JSON.stringify(self.serializeToObject(self), null, spaces);

  public readonly serializeToObject = (
    self: IEpistemology<Type, Knowledge>,
  ): ISerializedEpistemology => ({
    awareness: self.awareness ?
      self.awareness.serializeToObject(self.awareness!) :
      null,

    modelType: self.modelType,
    tags: [ ...self.tags ],
    thoughts: self.thoughts.serializeToObject(self.thoughts),
  });

  public readonly finalize?: (
    self: IEpistemology<Type, Knowledge>,
  ) => void;

  public readonly initialize?: (
    self: IEpistemology<Type, Knowledge>,
  ) => void;
}
