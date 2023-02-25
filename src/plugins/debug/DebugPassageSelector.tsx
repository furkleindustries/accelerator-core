import {
  AppContextConsumerWrapper,
} from '../../../src/components/AppContextConsumerWrapper';
import classNames from 'classnames';
import {
  createPassageNavigationAction,
} from '../../actions/creators/createPassageNavigationAction';
import {
  getFrozenObject,
} from '../../functions/getFrozenObject';
import {
  IDebugPassageSelectorDispatchProps,
} from './IDebugPassageSelectorDispatchProps';
import {
  IDebugPassageSelectorOwnProps,
} from './IDebugPassageSelectorOwnProps';
import {
  IDebugPassageSelectorStateProps,
} from './IDebugPassageSelectorStateProps';
import {
  IState,
} from '../../state/IState';
import {
  MapDispatchToProps,
  MapStateToProps,
  connect,
} from 'react-redux';
import {
  Select,
} from '../../components/Select';
import {
  stopAllSoundsAutomatically,
} from '../../functions/stopAllSoundsAutomatically';

import * as React from 'react';

import styles from '../../../plugins/debug/index.less';

export const DebugPassageSelectorUnconnected: React.FC<
  IDebugPassageSelectorOwnProps &
    IDebugPassageSelectorStateProps &
    IDebugPassageSelectorDispatchProps
> = ({
  closeMenu,
  currentPassageName,
  dispatch,
  id,
}) => (
  <AppContextConsumerWrapper>
    {({
      config: {
        debugOptions,
        soundManager: {
          excludeFromAutomaticStop: ignores,
        },

        startPassageName,
      },
 
      getSoundManager,
      passagesMap,
    }) => {
      const {
        collection: { groups },
      } = getSoundManager();

      const switchPassage = ({
        currentTarget: { value: newPassageName },
      }: React.ChangeEvent<HTMLSelectElement>) => {
        closeMenu();

        stopAllSoundsAutomatically(getFrozenObject(groups), ignores);

        // Delay to ensure not clashing with a replay of the same song.
        setTimeout(() => {
          const passageObj = passagesMap[newPassageName];
          const passAct = createPassageNavigationAction(passageObj);
          dispatch(passAct);
        }, 66);
      };

      const sortedPassagesNames = Object.keys(passagesMap)
        .filter((passageName) => passageName !== startPassageName)
        .sort((aa, bb) => {
          if (bb.startsWith(aa)) {
            return -1;
          } else if (aa.startsWith(bb)) {
            return 1;
          } 

          if (bb > aa) {
            return -1;
          } else if (aa > bb) {
            return 1;
          }

          return 0;
        });

      return (
        <Select
          className={classNames(
            styles['debug-passage-selector'],
            'debug-passage-selector',
          )}

          id={id || 'debug-passage-navigation-selector'}
          value={currentPassageName}
          native={true}
          onChange={switchPassage}
        >
          <option
            className={classNames(
              'debug-passage-selector-item',
              styles['debug-passage-selector-item'],
              'start-passage',
            )}

            key={startPassageName}
          >
            {startPassageName}
          </option>

          {debugOptions.startPassageAfterMenu ?
            <option
              className={classNames(
                'debug-passage-selector-item',
                styles['debug-passage-selector-item'],
                'debug-start-passage-after-menu',
              )}

              key={debugOptions.startPassageAfterMenu}
            >
              {debugOptions.startPassageAfterMenu}
            </option>:
            null}

          {sortedPassagesNames.map((key) => (
            <option
              className={classNames(
                'debug-passage-selector-item',
                styles['debug-passage-selector-item'],
                { 'starting-passage': key === startPassageName },
              )}

              key={key}
            >
              {key}
            </option>
          ))}
        </Select>
      );
    }}
  </AppContextConsumerWrapper>
);

export const mapStateToProps: MapStateToProps<
  IDebugPassageSelectorStateProps,
  IDebugPassageSelectorOwnProps,
  IState
> = ({
  history: {
    present: {
      passageName: currentPassageName,
    },
  }
}) => ({ currentPassageName });

export const mapDispatchToProps: MapDispatchToProps<
  IDebugPassageSelectorDispatchProps,
  IDebugPassageSelectorOwnProps
> = (dispatch) => ({ dispatch });

export const DebugPassageSelector = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DebugPassageSelectorUnconnected);
