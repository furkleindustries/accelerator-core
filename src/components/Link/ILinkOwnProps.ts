import {
  IButtonProps,
} from '../Button/IButtonProps';
import {
  Tag,
} from '../../tags/Tag';
import {
  ITaggable,
} from '../../interfaces/ITaggable';

export interface ILinkOwnProps extends IButtonProps, ITaggable {
  readonly passageName: string;
}
