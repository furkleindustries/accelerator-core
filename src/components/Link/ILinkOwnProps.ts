import {
  IButtonProps,
} from '../Button/IButtonProps';
import {
  Tag,
} from '../../tags/Tag';

export interface ILinkOwnProps extends IButtonProps {
  readonly passageName: string;
  readonly tags?: Tag[];
}
