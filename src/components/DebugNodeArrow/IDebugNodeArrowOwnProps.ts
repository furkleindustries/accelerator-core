import {
  IClassNameable,
} from '../../interfaces/IClassNameable';

export interface IDebugNodeArrowOwnProps extends IClassNameable {
  readonly expanded: boolean;
  readonly glyphCollapsed?: string;
  readonly glyphExpanded?: string;
}
