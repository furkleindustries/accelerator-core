import classNames from 'classnames';
import {
  ICurrentDisplayNameOwnProps,
} from './ICurrentDisplayNameOwnProps';
import {
  IPassage,
} from '../../passages/IPassage';
import {
  Typography,
} from '../Typography';

import * as React from 'react';

import builtIns from '../../../passages/_global-styles/components/index.less';

export const CurrentPassageDisplayName: React.FC<ICurrentDisplayNameOwnProps> = ({
  className,
  currentPassageName,
  passagesMap,
}) => {
  const chapterCount = (Object.values(passagesMap) as IPassage[]).filter(({
    name: passageName,
  }) => (
    new RegExp(/^chapter-(0[1-9])|([1-9][0-9])$/i).test(passageName.trim())
  )).length;

  const splitted = currentPassageName.split(new RegExp(/-/g));
  const chapterStr =
    splitted.map((part) => (
      `${part[0].toUpperCase()}${part.slice(1)}`
    )).map((word, idx) => {
      if (splitted.length > 2 && !(new RegExp(/^negative$/i).test(splitted[1]))) {
        if (idx === splitted.length - 1) {
          if (splitted.length === 3) {
            return `(${word})`;                  
          }

          return `${word})`;
        } else if (idx === 2) {
          return `(${word}`;
        }
      }

      return word;
    }).join(' ') +

    ' / ' +

    chapterCount;

  return (
    <div
      className={classNames(
        builtIns['current-passage-display-name'],
        'current-passage-display-name',
      )}

      role="group"
    >
      <Typography
        className={classNames(
          builtIns['current-passage-display-name-label'],
          'current-passage-display-name-label',
        )}

        variant="h6"
      >
        Current passage
      </Typography>

      <Typography
        component="span"
        className={classNames(
          builtIns['current-passage-display-name-content'],
          'current-passage-display-name-content',
          className,
        )}

        role="contentinfo"
      >
        {chapterStr}
      </Typography>
  </div>
  );
};
