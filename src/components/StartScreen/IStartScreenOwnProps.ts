import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  PassageNames,
} from '../../passages/IPassagesMap';

export interface IStartScreenOwnProps extends IClassNameable {
  readonly fadeOutDuration: number;
  readonly startPassageName: PassageNames;
  readonly creditsPassageName: PassageNames;
  readonly notesPassageName: PassageNames;
  readonly noScreenReadingTitle?: boolean;
}
