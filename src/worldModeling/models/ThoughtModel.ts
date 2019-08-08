import {
  IModel,
} from './IModel';
import {
  ModelBase,
} from './ModelBase';
import {
  ModelType,
} from './ModelType';

export class ThoughtModel
  extends ModelBase<ModelType.Thought>
  implements IModel<ModelType.Thought>
{
  public get being() {
    return null;
  }

  public get knowledge() {
    return null;
  }

  public readonly findAllGenerator = ((self: this) => function* () {
    
  })(this);
}
