import {
  createStoryStateAction,
} from '../../actions/creators/createStoryStateAction';
import {
  getAppContext,
} from '../../context/getAppContext';
import {
  IAppContextProviderWrapperOwnProps,
} from './IAppContextProviderWrapperOwnProps';

import * as React from 'react';

export const AppContextProviderWrapper: React.FC<IAppContextProviderWrapperOwnProps> = ({
  children,
  initialContext,
  initialContext: {
    config: {
      debugOptions: {
        storyState: debugStoryState,
      },
    },

    store: {
      dispatch,
      getState,
    },
  },
}) => {
  const { Provider: AppContextProvider } = getAppContext(initialContext)!;

  const { debug } = getState();
  // Allow the debug options to set base state.
  if (debug && debugStoryState) {
    dispatch(createStoryStateAction(debugStoryState, ''));
  }

  return (
    <AppContextProvider value={initialContext}>
      {children}
    </AppContextProvider>
  );
};
