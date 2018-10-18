import {
  ICurrentPassageNameAction,
} from '../../actions/ICurrentPassageNameAction';
import {
  ILastLinkTagsAction,
} from '../../actions/ILastLinkTagsAction';

export interface ILinkDispatchProps {
  setLastLinkTags(): ILastLinkTagsAction;
  changePassage(): ICurrentPassageNameAction;
}

export default ILinkDispatchProps;
