import * as fs from 'fs-extra';
import {
  getTemplatingData,
} from './getTemplatingData';
import {
  paths,
} from '../paths';
import Handlebars from 'handlebars';

export class HandlebarsPlugin {
  constructor(config, htmlPlugin) {
    this.config = config;
    this.htmlPlugin = htmlPlugin;

    Handlebars.registerPartial(
      'fontFaceObserver',
      Handlebars.compile(
        fs.readFileSync(paths.fontFaceObserverTemplate, 'utf8'),
      )(),
    );

    const fontLoaderTemplate = fs.readFileSync(paths.fontLoaderTemplate, 'utf8');
    Handlebars.registerPartial(
      'fontLoader',
      Handlebars.compile(fontLoaderTemplate)(getTemplatingData(config)),
    );
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('AcceleratorHandlebarsPlugin', compilation => {
      this.htmlPlugin
        .getHooks(compilation)
        .beforeEmit.tap('AcceleratorHandlebarsPlugin', (data) => {
          const template = Handlebars.compile(data.html);
          data.html = template(getTemplatingData(this.config));
        });
    });
  }
}
