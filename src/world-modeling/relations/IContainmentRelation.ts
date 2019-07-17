import {
  IModel,
} from '../IModel';
import {
  ModelType,
} from '../ModelType';
import {
  IFindModelArgs,
} from '../IFindModelArgs';
import {
  IWorld,
} from '../IWorld';

export interface IContainmentRelation<T extends ModelType> {
  readonly children: ReadonlyArray<IModel<T>>;
  readonly parent: IModel<ModelType> | IWorld;
  readonly world: IWorld;
  readonly descendants: () => ReadonlyArray<IModel<T>>;
  readonly find: (args: string | IFindModelArgs<T>) => IModel<T> | null;
  readonly findAll: (args: IFindModelArgs<T>) => ReadonlyArray<IModel<T>>;
  readonly findParent: (args: string | IFindModelArgs<ModelType>) => IModel<ModelType> | null;
  readonly findAllParents: (args: string | IFindModelArgs<ModelType>) => ReadonlyArray<IModel<ModelType>>;
  readonly parents: () => ReadonlyArray<IModel<ModelType> | IWorld>;
}
