export * from '../src/passages/getFootersList';

import { getHeadersList as temp1 } from '../src/passages/getHeadersList';
export const getHeadersList = temp1;

import { getPassagesMapAndStartPassageName as temp2 } from '../src/passages/getPassagesMapAndStartPassageName';
export const getPassagesMapAndStartPassage = temp2;

export * from '../src/passages/IFooter';
export * from '../src/passages/IHeader';
export * from '../src/passages/IPassage';
export * from '../src/passages/IPassageProps';
