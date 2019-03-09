import {
  IAction,
} from '../../actions/IAction';
import {
  IPassagesMap,
} from '../../passages/IPassagesMap';
import {
  IPlugin,
} from '../../plugins/IPlugin';
import {
  IState,
} from '../../state/IState';
import {
  ReactNodeWithoutNullOrUndefined,
} from '../../typeAliases/ReactNodeWithoutNullOrUndefined';
import {
  Store,
} from 'redux';

export interface IPassagePluginsWrapperOwnProps {
  readonly children: ReactNodeWithoutNullOrUndefined;
  readonly passagesMap: IPassagesMap;
  readonly plugins: IPlugin[];
  readonly reduxStore: Store<IState, IAction>;
}
