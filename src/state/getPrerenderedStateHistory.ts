import {
  getSaveRegistry,
} from '../../plugins/save-manager/getSaveRegistry';
import {
  IHistory,
} from './IHistory';
import {
  IStoryStateSavePointerMap,
} from './IStoryStateSavePointerMap';
import {
  readFromSaveRegistry,
} from '../../plugins/save-manager/readFromSaveRegistry';

export const getPrerenderedStateHistory = (
  loadAutosave: boolean,
): Promise<IHistory | null> => (
  new Promise((resolve, reject) => {
    if (loadAutosave) {
      try {
        let saveRegistry: IStoryStateSavePointerMap | null = null;
        try {
          saveRegistry = { ...getSaveRegistry() };
        } catch (err) {}

        if (saveRegistry && saveRegistry.Autosave) {
          const { engineHistory } = readFromSaveRegistry(saveRegistry.Autosave);
          return resolve({ ...engineHistory });
        }
      } catch (err) {
        return reject(err);
      }
    }

    return resolve((window as any).REDUX_STATE || null);
  })
);
