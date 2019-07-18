import {
  IFindModelArgs,
} from '../models/IFindModelArgs';
import {
  IModel,
} from '../models/IModel';
import {
  IRelation,
} from './IRelation';
import {
  IWorld,
} from '../models/IWorld';
import {
  ModelType,
} from '../models/ModelType';

export interface IContainmentRelation<T extends ModelType> extends IRelation<T> {
  readonly children: Readonly<Record<string, IModel<T>>>;
  readonly parent: IModel<ModelType> | IWorld;
  readonly addChild: (model: string | IModel<T>) => void;
  readonly removeChild: (model: string | IModel<T>) => void;
  readonly move: (parent: IModel<ModelType> | IWorld) => void;
  readonly descendants: () => ReadonlyArray<IModel<T>>;
  readonly findParent: (
    args: string | IFindModelArgs<ModelType>,
  ) => IModel<ModelType> | null;
  
  readonly findAllParents: (
    args: string | IFindModelArgs<ModelType>,
  ) => ReadonlyArray<IModel<ModelType>>;

  readonly parents: () => ReadonlyArray<IModel<ModelType> | IWorld>;
}
