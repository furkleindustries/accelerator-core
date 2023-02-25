import {
  IClassNameable,
} from '../../interfaces/IClassNameable';

export interface IDebugObjectNameOwnProps extends IClassNameable {
  readonly depth: number;
  readonly nodeName: string;
  readonly delimiterGlyph?: string;
  readonly dimmed?: boolean;
}
