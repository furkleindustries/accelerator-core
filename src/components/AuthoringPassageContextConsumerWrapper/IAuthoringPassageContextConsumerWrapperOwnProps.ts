import {
  FunctionComponent,
} from 'react';
import {
  IPassageContainerOwnProps,
} from '../PassageContainer/IPassageContainerOwnProps';

export interface IAuthoringPassageContextConsumerWrapperOwnProps extends IPassageContainerOwnProps {
  readonly children: FunctionComponent<IPassageContainerOwnProps>;
}
