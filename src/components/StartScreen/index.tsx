import classNames from 'classnames';
import {
  createPassageNavigationAction,
} from '../../actions/creators/createPassageNavigationAction';
import {
  AppContextConsumerWrapper,
} from '../../../bundles/componentsBundle';
import {
  getSaveRegistry,
} from '../../../plugins/save-manager/getSaveRegistry';
import {
  IAcceleratorConfigNormalized,
} from '../../configuration/IAcceleratorConfigNormalized';
import {
  IPassage,
} from '../../passages/IPassage';
import {
  IPassagesMap,
  PassageNames,
} from '../../passages/IPassagesMap';
import {
  IStartScreenDispatchProps,
} from './IStartScreenDispatchProps';
import {
  IStartScreenOwnProps,
} from './IStartScreenOwnProps';
import {
  IStartScreenState,
} from './IStartScreenState';
import {
  IStartScreenStateProps,
} from './IStartScreenStateProps';
import {
  IState,
} from '../../state/IState';
import {
  IStorySerializationPointer,
} from '../../state/IStorySerializationPointer';
import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
} from 'react-redux';
import {
  StartScreenChoices,
} from '../StartScreenChoices';
import {
  StartScreenLogo,
} from '../StartScreenLogo';
import {
  StartScreenTitle,
} from '../StartScreenTitle';
import {
  assertValid,
} from 'ts-assertions';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export class StartScreenUnconnected extends React.PureComponent<
  IStartScreenOwnProps &
    IStartScreenStateProps &
    IStartScreenDispatchProps,

  IStartScreenState
> {
  private timerId: any;

  public readonly state: IStartScreenState = { fading: false };

  public readonly render = () => (
    <AppContextConsumerWrapper>
      {({
        config,
        config: {
          debugOptions: { startPassageAfterMenu },
          loadAutosaveAtStart,
          loggers: {
            log,
            warn,
          },

          startPassageName: menuPassageName,
        },

        passagesMap,
      }) => {
        const {
          creditsPassageName,
          fadeOutDuration,
          debug,
          newGameCounter,
          notesPassageName,
          startPassageName: propStartPassageName,
        } = this.props;

        const { fading } = this.state;
    
        let realPassageNameAfterMenu = propStartPassageName as PassageNames;
        if (debug && startPassageAfterMenu) {
            // Allow the debug options to set the start passage name.
          if (startPassageAfterMenu === 'XLR8R_RANDOM') {
            const filteredPassages = (Object.values(passagesMap) as IPassage[])
              .filter(({ name: passageName }) => (
                passageName !== creditsPassageName &&
                  passageName !== notesPassageName &&
                  passageName !== (propStartPassageName || menuPassageName)
              ));
    
            const randIdx = Math.floor(Math.random() * filteredPassages.length);
            realPassageNameAfterMenu = filteredPassages[randIdx].name;
          } else {
            realPassageNameAfterMenu = startPassageAfterMenu;
          }
        } else if (loadAutosaveAtStart) {
          let autosave: IStorySerializationPointer | null = null;
          try {
            const registry = getSaveRegistry();
            autosave = registry.Autosave;
          } catch (err) {
            if (debug) {
              warn(err);
            }
          }
    
          if (autosave) {
            realPassageNameAfterMenu = autosave.currentPassageName;
    
            if (autosave.currentPassageName === menuPassageName ||
              autosave.currentPassageName === creditsPassageName ||
              autosave.currentPassageName === notesPassageName)
            {
              realPassageNameAfterMenu = propStartPassageName;
            }
    
            if (debug && realPassageNameAfterMenu !== propStartPassageName) {
              log('---- Save Manager ----')
              log(
                `An autosave was found. Redirecting from start menu to ` +
                  `"${realPassageNameAfterMenu}".`,
              );
    
              log('--------');
            }
          }
        }

        const creditsRedirector = () => (
          this.creditsRedirector(passagesMap, config)
        );

        const notesRedirector = () => (
          this.notesRedirector(passagesMap, config)
        );

        const startRedirector = () => (
          this.startRedirector(passagesMap, {
            ...config,
            startPassageName: realPassageNameAfterMenu,
          })
        );

        return (
          <div
            className={classNames(
              builtIns['start-screen'],
              'start-screen',
              this.props.className,
              { [builtIns['fading']]: fading },
              { fading },
            )}

            role="group"
            style={{
              transitionDuration: `${fadeOutDuration}ms`,
              filter: `invert(${newGameCounter > 0 ? 100 : 0}%)`,
            }}
          >
            <StartScreenTitle />

            <StartScreenChoices
              creditsRedirector={creditsRedirector}
              configStartPassageName={propStartPassageName}
              loadAutosaveAtStart={loadAutosaveAtStart}
              newGameCounter={newGameCounter}
              notesRedirector={notesRedirector}
              startPassageName={realPassageNameAfterMenu}
              startRedirector={startRedirector}
            />

            <StartScreenLogo />
          </div>
        );
      }}
    </AppContextConsumerWrapper>
  );

  public readonly componentWillUnmount = () => {
    if (this.timerId) {
      clearTimeout(this.timerId);
      delete this.timerId;
    }
  };

  public readonly redirect = (
    which: 'credits' | 'notes' | 'start',
    { startPassageName }: IAcceleratorConfigNormalized,
    passagesMap: IPassagesMap,
  ) => {
    const {
      creditsPassageName,
      dispatch,
      fadeOutDuration,
      notesPassageName,
    } = this.props;

    let passage: IPassage;
    if (which === 'credits'){
      passage = assertValid<IPassage>(
        passagesMap[creditsPassageName],
        'No suitable credits passage identifier provided to StartScreen.',
      );
    } else if (which === 'notes') {
      passage = assertValid<IPassage>(
        passagesMap[notesPassageName],
        'No suitable notes passage identifier provided to StartScreen.',
      );
    } else {
      passage = assertValid<IPassage>(
        passagesMap[startPassageName],
        'No suitable start passage identifier provided to StartScreen.redirect.',
      );
    }

    this.setState({ fading: true });

    this.timerId = setTimeout(
      () => this.setState(
        { fading: false },
        () => dispatch(createPassageNavigationAction(passage)),
      ),

      fadeOutDuration,
    );
  };

  public readonly startRedirector = (
    passagesMap: IPassagesMap,
    config: IAcceleratorConfigNormalized,
  ) => (
    this.redirect(
      'start',
      config,
      passagesMap,
    )
  );

  public readonly creditsRedirector = (
    passagesMap: IPassagesMap,
    config: IAcceleratorConfigNormalized,
  ) => (
    this.redirect(
      'credits',
      config,
      passagesMap,
    )
  );

  public readonly notesRedirector = (
    passagesMap: IPassagesMap,
    config: IAcceleratorConfigNormalized,
  ) => (
    this.redirect(
      'notes',
      config,
      passagesMap,
    )
  );
};

export const mapStateToProps: MapStateToProps<
  IStartScreenStateProps,
  IStartScreenOwnProps,
  IState
> = ({
  debug,
  history: {
    present: {
      storyState: { XLR8R_NEW_GAME: newGameCounter }
    },
  },
}) => ({
  debug,
  newGameCounter,
});

export const mapDispatchToProps: MapDispatchToProps<
  IStartScreenDispatchProps,
  IStartScreenOwnProps
> = (dispatch) => ({ dispatch });

export const StartScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartScreenUnconnected);
