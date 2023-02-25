import {
  configurationDefaults,
} from '../../src/configuration/configurationDefaults';
import {
  createStoryStateSaveRegistryInitAction,
} from '../../src/actions/creators/createStoryStateSaveRegistryInitAction';
import {
  getSaveRegistry,
} from './getSaveRegistry';
import {
  PassageNames,
} from '../../src/passages/IPassagesMap';
import {
  IState,
} from '../../src/state/IState';
import {
  IPlugin,
  IPluginExport,
} from '../../bundles/pluginsBundle';
import {
  pushToSaveRegistry,
} from './pushToSaveRegistry';
import {
  Store,
} from 'redux';
import { createStoryStateSaveAction } from '../../src/actions/creators/createStoryStateSaveAction';

class SaveManagerPlugin implements IPlugin {
  public readonly afterStoryInit: IPlugin['afterStoryInit'] = ({
    store,
  }) => {
    this.replicateSavePointersInState(store);
  };

  public readonly afterPassageChange: IPlugin['afterPassageChange'] = ({
    config: { historyFramesToSerialize },
    passageObject: { name: passageName },
    store,
  }) => {
    this.updateAutosave(passageName, store, historyFramesToSerialize);
  };

  public readonly replicateSavePointersInState = (
    store: Store<IState>,
  ) => {
    const registry = getSaveRegistry();
    store.dispatch(createStoryStateSaveRegistryInitAction(registry));
  };

  public readonly updateAutosave = (
    currentPassageName: PassageNames,
    store: Store<IState>,
    framesToSave = configurationDefaults.historyFramesToSave,
  ) => {
    const lastModified = new Date().getTime();
    const saveName = 'Autosave';
    const uuid = saveName;

    const pointer = {
      currentPassageName,
      lastModified,
      saveName,
      uuid,
    };

    pushToSaveRegistry(
      pointer,
      store,
      framesToSave,
    );

    store.dispatch(createStoryStateSaveAction(pointer));
  };
}

const plugin: IPluginExport = {
  content: new SaveManagerPlugin(),
  name: 'save-manager',
  precedence: 1,
};

export default plugin;
