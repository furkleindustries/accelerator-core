import {
  IJsxParserOwnProps,
} from './IJsxParserOwnProps';
import {
  JsxParser,
} from './_JsxParser';
import type {
  ReactNode,
} from 'react';

export const parseJsx = (props: IJsxParserOwnProps): ReactNode => (
  (new JsxParser(props)).parse()
);
