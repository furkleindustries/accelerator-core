import {
  IPlugin,
} from '../../plugins/IPlugin';

export interface IPassageRendererWrapperOwnProps {
  readonly plugins: IPlugin[];
  readonly children?: never[] | undefined;
}
