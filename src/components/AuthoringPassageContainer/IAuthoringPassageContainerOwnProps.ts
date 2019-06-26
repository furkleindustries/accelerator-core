import {
  IAuthoringPassageContext,
} from '../../context/IAuthoringPassageContext';
import {
  ReactElement,
} from 'react';

export interface IAuthoringPassageContainerOwnProps {
  readonly children: ReactElement;
  readonly value: IAuthoringPassageContext;
}
