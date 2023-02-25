import {
  IAction,
} from '../../actions/IAction';
import {
  IStorySerializationPointer,
} from '../../state/IStorySerializationPointer';
import {
  PassageNames,
} from '../../passages/IPassagesMap';

export interface ISaveViewControlsOwnProps {
  readonly currentPassageName: PassageNames;
  readonly destroy: () => IAction;
  readonly entry: IStorySerializationPointer;
  readonly menuStartPassageName: string;
  readonly read: () => IAction;
  readonly update: () => IAction;
}
