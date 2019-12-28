import {
  AppContextConsumerWrapper,
} from '../AppContextConsumerWrapper';
import {
  createStoryStateAction,
} from '../../actions/creators/createStoryStateAction';
import {
  ISetVariableProps,
} from './ISetVariableProps';

import * as React from 'react';

export const SetVariable: React.FunctionComponent<ISetVariableProps> = ({
  name,
  value,
}) => (
  <AppContextConsumerWrapper>
    {({ store }) => {
      if (!name || typeof name !== 'string') {
        throw new Error(`The provided name argument ${name} was out of band.`);
      }

      store.dispatch(
        createStoryStateAction({ [name]: value })
      );

      return null;
    }}
  </AppContextConsumerWrapper>
);
