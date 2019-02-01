// tslint:disable
const path = require('path');

process.env.NODE_PATH = path.join(__dirname, '..', '..', 'node_modules');

module.exports = function (wallaby) {
  const testPathExp = '../../(footers|headers|passages|plugins|src)/**/*.(spec|test).[jt]s?(x)';
  const compilerOptions = {
    ...require('../../tsconfig.json').compilerOptions,
  };

  compilerOptions.module = 'commonjs';

  return {
    files: [
      '../../(footers|headers|passages|plugins|src)/**/*.+(js|jsx|ts|tsx|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      '../../tsconfig.json',
      `!${testPathExp}`,
      {
        pattern: './**/*',
        instrument: false,
      },
    ],

    tests: [ testPathExp ],
    env: {
      runner: 'node',
      type: 'node',
    },

    compilers: {
      '**/*.js?(x)': wallaby.compilers.babel({
        babel: require('babel-core'),
        presets: [ 'react-app', ],
      }),

      '**/*.ts?(x)': wallaby.compilers.typeScript(compilerOptions)
    },

    preprocessors: {
      '**/*.js?(x)': (file) => (
        require('babel-core').transform(file.content, {
          compact: false,
          filename: file.path,
          presets: [ 'react-app' ],
          sourceMap: true,
        })
      ),
    },

    setup() {
      const jestConfig = require('./jest.config');
      Object.keys(jestConfig.transform || {}).forEach(
        k => ~k.indexOf('^.+\\.(js|jsx') && void delete jestConfig.transform[k]
      );

      delete jestConfig.testEnvironment;
      wallaby.testFramework.configure(jestConfig);
    },

    testFramework: 'jest',
  };
};
