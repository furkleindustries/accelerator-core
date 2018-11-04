import {
  ReactNode,
} from 'react';
import {
  Tag,
} from '../../tags/Tag';

export interface ILinkOwnProps {
  children: ReactNode;
  className?: string;
  passageName: string;
  tags?: Tag[];
}
