import {
  IClassNameable,
} from '../../interfaces/IClassNameable';
import {
  ISectionOwnProps,
} from '../Section/ISectionOwnProps';
import {
  ITypographyProps,
} from '../Typography/ITypographyProps';
import type {
  ComponentType,
  ReactNode,
} from 'react';

export interface InkSectionOwnProps extends IClassNameable, ISectionOwnProps {
  readonly children: ReactNode;
  readonly Section?: ComponentType<ISectionOwnProps>;
  readonly Typography?: ComponentType<ITypographyProps>;
}
