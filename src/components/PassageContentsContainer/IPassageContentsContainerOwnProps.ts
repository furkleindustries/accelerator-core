import {
  IManager,
} from 'sound-manager';
import {
  IPassagesMap,
} from '../../passages/IPassagesMap';
import {
  IPlugin,
} from '../../plugins/IPlugin';
import {
  Tag,
} from '../../tags/Tag';

export interface IPassageContentsContainerOwnProps {
  readonly passagesMap: IPassagesMap;
  readonly soundManager: IManager;
  readonly plugins: IPlugin[];
  navigateTo(passageName: string, tags?: Tag[]): void;
}
