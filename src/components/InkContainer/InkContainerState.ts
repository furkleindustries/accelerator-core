import {
  InkSectionOwnProps,
} from '../InkSection/InkSectionOwnProps';
import {
  ReactElement,
} from 'react';

export interface InkContainerState {
  readonly sections: ReactElement<InkSectionOwnProps>[];
}
