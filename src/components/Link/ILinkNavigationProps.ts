import {
  IAction,
} from '../../actions/IAction';
import {
  IPassage,
} from '../../passages/IPassage';
import {
  IPassageNamed,
} from '../../interfaces/IPassageNamed';
import {
  ITaggable,
} from '../../interfaces/ITaggable';
import {
  Dispatch,
} from 'redux';

export interface ILinkNavigationProps
  extends
    IPassageNamed,
    ITaggable
{
  readonly dispatch: Dispatch<IAction>;
  readonly passage: IPassage;
}
