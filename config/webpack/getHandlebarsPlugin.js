import * as fs from 'fs-extra';
import {
  getTemplatingData,
} from './getTemplatingData';
import {
  paths,
} from '../paths';
import Handlebars from 'handlebars';

Handlebars.registerPartial(
  'fontFaceObserver',
  Handlebars.compile(fs.readFileSync(paths.fontFaceObserverTemplate, 'utf8'))(),
);

Handlebars.registerPartial(
  'fontLoader',
  Handlebars.compile(fs.readFileSync(paths.fontLoaderTemplate, 'utf8'))(),
);

export function getHandlebarsPlugin(config, WebpackHtmlPlugin) {
  return new (class HandlebarsPlugin {
    apply(compiler) {
      compiler.hooks.compilation.tap('AcceleratorHandlebarsPlugin', compilation => {
        WebpackHtmlPlugin
          .getHooks(compilation)
          .beforeEmit.tap('AcceleratorHandlebarsPlugin', (data) => {
            const template = Handlebars.compile(data.html);
            data.html = template(getTemplatingData(config));
          });
      });
    }
  });
}