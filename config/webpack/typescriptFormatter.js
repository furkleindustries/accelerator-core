import chalk from 'chalk';
import {
  codeFrameColumns,
} from '@babel/code-frame';
import {
  existsSync,
  readFileSync,
} from 'fs-extra';
import * as os from 'os';

export const typescriptFormatter = (message, useColors) => {
  const hasGetters = typeof message.getFile === 'function';
  const colors = new chalk.Instance({ enabled: useColors });
  const messageColor = message.isWarningSeverity() ?
    colors.yellow :
    colors.red;

  const source = hasGetters ?
    message.getFile() &&
      existsSync(message.getFile()) &&
      readFileSync(message.getFile(), 'utf-8') :
    message.file &&
      existsSync(message.file) &&
      readFileSync(message.file, 'utf-8');

  const frame = source ?
    codeFrameColumns(
      source,

      {
        start: {
          column: message.character,
          line: message.line,
        },
      },

      { highlightCode: useColors },
    ).split('\n').map((str) => `  ${str}`).join(os.EOL) :
    '';

  const severity = hasGetters ?
    message.getSeverity() :
    message.severity;

  const types = {
    diagnostic: 'TypeScript',
    lint: 'ESLint',
  };

  const prefix = `${message.type === 'lint' ? 'Rule: ' : 'TS'}${message.code}`;

  const topMsg = messageColor.bold(
    `${types[message.type]} ${severity.toLowerCase()}: `,
  ) + `${hasGetters ? message.getContent() : message.content}  ` +
    `${messageColor.underline(prefix)}`;

  return [
    topMsg,
    '',
    frame,
  ].join(os.EOL);
};
