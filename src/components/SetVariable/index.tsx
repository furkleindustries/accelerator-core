import {
  GetState,
} from '../GetState';
import {
  ISetVariableProps,
} from './ISetVariableProps';

import * as React from 'react';

export const SetVariable: React.FC<ISetVariableProps> = ({
  name,
  value,
}) => (
  <GetState>
    {({}, { setStoryState }) => {
      if (!name || typeof name !== 'string') {
        throw new Error(`The provided name argument ${name} was out of band.`);
      }

      setStoryState({ [name]: value });

      return null;
    }}
  </GetState>
);
