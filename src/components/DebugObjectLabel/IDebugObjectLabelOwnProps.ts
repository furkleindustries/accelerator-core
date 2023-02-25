import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  SerializableDataTypes,
} from '../../state/SerializableDataTypes';

export interface IDebugObjectLabelOwnProps extends IClassNameable {
  readonly data: SerializableDataTypes;
  readonly depth: number;
  readonly nodeName: string;
  readonly path: string;
  readonly isNonenumerable?: boolean;
}
