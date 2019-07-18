import {
  IEpistemology,
} from './IEpistemology';
import {
  IFindModelArgs,
} from './IFindModelArgs';
import {
  IModel,
} from './IModel';
import {
  IModelConstructorArgs,
} from './IModelConstructorArgs';
import {
  IOntology,
} from './IOntology';
import {
  ModelType,
} from './ModelType';
import {
  Tag,
} from '../../tags/Tag';

export interface IWorld {
  readonly being: IOntology<ModelType> | null;
  readonly epistemology: IEpistemology<ModelType> | null;
  readonly models: Readonly<Record<string, IModel<ModelType>>>;
  readonly name: string;
  readonly tags: Tag[];

  readonly addModel: <T extends ModelType>(model: IModel<T>) => void;

  readonly createModel: <T extends ModelType>(
    args: IModelConstructorArgs<T>,
  ) => IModel<T>;

  readonly removeModel: <T extends ModelType>(
    model: string | IModel<T>,
  ) => void;

  readonly children: () => ReadonlyArray<IModel<ModelType>>;
  readonly clone: () => IWorld;
  readonly descendants: () => ReadonlyArray<IModel<ModelType>>;
  readonly destroy: () => void;

  readonly find: <T extends ModelType>(
    args: string | IFindModelArgs<T>,
  ) => IModel<T> | null;

  readonly findAll: <T extends ModelType>(
    args: IFindModelArgs<T>,
  ) => ReadonlyArray<IModel<T>>;
}
