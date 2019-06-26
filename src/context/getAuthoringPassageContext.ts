import {
  createContext,
} from 'react';
import {
  IAuthoringPassageContext,
} from './IAuthoringPassageContext';

export const getAuthoringPassageContext = (props: IAuthoringPassageContext) => (
  createContext({ ...props })
);
