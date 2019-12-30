import {
  IAction,
} from '../../actions/IAction';
import {
  IPassage,
} from '../../passages/IPassage';
import {
  Dispatch,
} from 'redux';
import {
  Tag,
} from '../../tags/Tag';

export interface ILinkNavigationProps {
  readonly dispatch: Dispatch<IAction>;
  readonly passage: IPassage;
  readonly passageName?: string;
  readonly tags?: Tag[] | ReadonlyArray<Tag>;
}
