import {
  IPassage,
} from '../../passages/IPassage';
import {
  IPassageNavigationAction,
} from '../../actions/IPassageNavigationAction';
import {
  Dispatch,
} from 'redux';
import {
  Tag,
} from '../../tags/Tag';

export interface ILinkNavigationProps {
  readonly dispatch: Dispatch<IPassageNavigationAction>;
  readonly passage: IPassage;
  readonly passageName?: string;
  readonly tags?: ReadonlyArray<Tag>;
}
