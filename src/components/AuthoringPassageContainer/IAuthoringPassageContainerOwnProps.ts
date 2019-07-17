import {
  IPassageProps,
} from '../../passages/IPassageProps';
import {
  ComponentType,
  ReactElement,
} from 'react';

export interface IAuthoringPassageContainerOwnProps {
  readonly children: ReactElement;
  readonly passageProps: IPassageProps;
  readonly components?: Record<keyof JSX.IntrinsicElements, ComponentType<any>>;
  readonly replaceComponents?: boolean;
}
