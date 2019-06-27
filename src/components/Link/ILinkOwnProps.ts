import {
  IButtonProps,
} from '../Button/IButtonProps';
import {
  ITaggable,
} from '../../interfaces/ITaggable';

export interface ILinkOwnProps extends IButtonProps, ITaggable {
  readonly passageName: string;
}
