import {
  IButtonOwnProps,
} from '../Button/IButtonOwnProps';
import {
  IPassageNamed,
} from '../../interfaces/IPassageNamed';
import {
  ITaggable,
} from '../../interfaces/ITaggable';

export interface ILinkOwnProps extends
  IButtonOwnProps,
  IPassageNamed,
  ITaggable
{
}
