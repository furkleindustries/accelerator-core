import {
  IFooter,
} from '../../passages/IFooter';
import {
  IHeader,
} from '../../passages/IHeader';
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

export interface IPassageOwnProps {
  readonly footers: IFooter[];
  readonly headers: IHeader[];
  readonly passagesMap: IPassagesMap;
  readonly plugins: IPlugin[];
  readonly soundManager: IManager;
  navigateTo(passageName: string, tags?: Tag[]): void;
}
