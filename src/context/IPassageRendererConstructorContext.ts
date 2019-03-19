import {
  IPassageRendererOwnProps,
} from '../renderers/IPassageRendererOwnProps';
import {
  ComponentType,
} from 'react';

export interface IPassageRendererConstructorContext {
  readonly PassageRendererComponent: ComponentType<IPassageRendererOwnProps>;
}
