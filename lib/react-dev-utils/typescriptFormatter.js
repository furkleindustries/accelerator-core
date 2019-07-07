/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import * as os from 'os';
import codeFrame from '@babel/code-frame';
import chalk from 'chalk';
import * as fs from 'fs-extra';

export const typescriptFormatter = (message, useColors) => {
  const hasGetters = typeof message.getFile === 'function';
  const colors = new chalk.constructor({ enabled: useColors });
  const messageColor = message.isWarningSeverity() ? colors.yellow : colors.red;

  const source = hasGetters ?
    message.getFile() &&
      fs.existsSync(message.getFile()) &&
      fs.readFileSync(message.getFile(), 'utf-8') :
    message.file &&
      fs.existsSync(message.file) &&
      fs.readFileSync(message.file, 'utf-8');

  const frame = source ?
    codeFrame(
      source,
      {
        start: {
          column: message.character,
          line: message.line,
        },
      },
      { highlightCode: useColors },
    )
      .split('\n')
      .map((str) => `  ${str}`)
      .join(os.EOL) :
    '';

  const severity = hasGetters ? message.getSeverity() : message.severity;
  const types = {
    diagnostic: 'TypeScript',
    lint: 'TSLint',
  };

  const prefix = `${message.type === 'lint' ? 'Rule: ' : 'TS'}${message.code}`;

  let topMsg = (
    messageColor.bold(`${types[message.type]} ${severity.toLowerCase()}: `) +
    `${hasGetters ? message.getContent() : message.content}  ` +
      `${messageColor.underline(prefix)}`
  );

  const retVal = [
    topMsg,
    '',
    frame,
  ].join(os.EOL);

  return retVal;
};
