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
  ModelType,
} from './ModelType';
import {
  IOntology,
} from './IOntology';
import {
  Tag,
} from '../tags/Tag';

export interface IWorld {
  readonly being: IOntology<ModelType> | null;
  readonly name: string;
  readonly models: Readonly<Record<string, IModel<ModelType>>>;
  readonly tags: Tag[];
  readonly addModel: <T extends ModelType>(model: IModel<T>) => void;
  readonly children: () => ReadonlyArray<IModel<ModelType>>;
  readonly clone: () => IWorld;
  readonly createModel: <T extends ModelType>(args: IModelConstructorArgs<T>) => IModel<T>;
  readonly descendants: () => ReadonlyArray<IModel<ModelType>>;
  readonly destroy: () => void;
  readonly find: <T extends ModelType>(args: string | IFindModelArgs<T>) => IModel<T> | null;
  readonly findAll: <T extends ModelType>(args: IFindModelArgs<T>) => ReadonlyArray<IModel<T>>;
  readonly removeModel: <T extends ModelType>(model: IModel<T>) => void;
}
