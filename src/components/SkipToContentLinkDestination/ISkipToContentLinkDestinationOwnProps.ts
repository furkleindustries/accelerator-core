import {
  IUrlLinkOwnProps,
} from '../UrlLink/IUrlLinkOwnProps';
import {
  Omit,
} from '../../typeAliases/Omit';

export interface ISkipToContentLinkDestinationOwnProps extends Omit<IUrlLinkOwnProps, 'children'> {}
