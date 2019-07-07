import * as componentsBundle from '../../bundles/componentsBundle';
import {
  ParseReactElementsAndTextProps,
} from '../typeAliases/ParseReactElementsAndTextProps';
// @ts-ignore
import JsxParser from 'react-jsx-parser';
import {
  cloneElement,
  ComponentType,
} from 'react';

import * as React from 'react';

export const parsePlainTextAndReactElements = (text: string, {
  bindings,
  components,
  dontMergeComponents,
}: ParseReactElementsAndTextProps) => {
  const comps: Record<string, ComponentType<any>> =
    dontMergeComponents !== true ?
      {
        ...componentsBundle,
        ...components,
      } : (
        { ...(components || componentsBundle) }
      ) as Record<string, ComponentType<any>>;

  const elems: JSX.Element[] = [];
  let underscoresInRow = 0;
  let inReactMode = false;
  let blockStartIndex = 0;
  for (let ii = 0; ii < text.length; ii += 1) {
    const char = text[ii];
    if (char === '_') {
      underscoresInRow += 1;
      if (underscoresInRow === 3) {
        const block = text.slice(blockStartIndex, ii - 2);
        if (inReactMode) {
          const elem = (
            <JsxParser
              bindings={bindings}
              components={comps}
              jsx={block}
            />
          );

          elems.push(elem);
        } else {
          const span = <span>{block}</span>;
          elems.push(span);
        }

        inReactMode = !inReactMode;
        underscoresInRow = 0;
        blockStartIndex = ii + 1;
      }
    } else {
      underscoresInRow = 0;
    }
  }

  if (inReactMode) {
    throw new Error('Unfinished ___ink-react___ block detected.');
  }

  if (blockStartIndex < text.length) {
    const block = text.slice(blockStartIndex, text.length);
    const span = <span>{block}</span>;
    elems.push(span);
  }

  return elems.map((elem, key) => cloneElement(elem, { key }));
};
