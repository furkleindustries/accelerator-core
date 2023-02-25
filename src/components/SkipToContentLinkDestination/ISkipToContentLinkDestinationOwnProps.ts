import {
  IUrlLinkOwnProps,
} from '../UrlLink/IUrlLinkOwnProps';
import {
  ReactNoOutput,
} from '../../typeAliases/ReactNoOutput';

export interface ISkipToContentLinkDestinationOwnProps
  extends Omit<IUrlLinkOwnProps, 'children'>
{
  readonly children?: ReactNoOutput;
  readonly id?: string; 
}
