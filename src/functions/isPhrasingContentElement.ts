import {
  getHtmlPhrasingContentElementMap,
} from './getHtmlPhrasingContentElementMap';
import type {
  ReactElement,
} from 'react';

const phrasingElementMap = getHtmlPhrasingContentElementMap();

export const isPhrasingContentElement = ({ type }: ReactElement) => (
  phrasingElementMap.has(type as string)
);
