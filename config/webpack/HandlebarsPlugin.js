import chalk from 'chalk';
import csso from 'csso';
import * as fs from 'fs-extra';
import {
  getTemplatingData,
} from './getTemplatingData';
import Handlebars from 'handlebars';
import {
  minify,
} from 'html-minifier';
import {
  paths,
} from '../paths';
import UglifyJS from 'uglify-js';

export class HandlebarsPlugin {
  constructor(config, htmlPlugin) {
    this.config = config;
    this.htmlPlugin = htmlPlugin;

    Handlebars.registerHelper(
      'uglify',
      function (ctx) {
        const uglified = UglifyJS.minify(ctx.fn(this), {
          compress: {
            dead_code: false,
            drop_console: false,
            drop_debugger: false,
            negate_iife: false,
          },
  
          validate: false,
          warnings: true,
        });

        if (uglified.error) {
          console.error(chalk.red(uglified.error.toString()));
        } else if (uglified.warnings && uglified.warnings.length) {
          for (var ii = 0; ii < uglified.warnings.length; ii += 1) {
            console.warn(chalk.yellow(uglified.warnings[ii].toString()));
          }
        }

        return uglified.code || ctx;
      },
    );

    Handlebars.registerHelper(
      'json',
      JSON.stringify,
    );
    
    let imagePreloader = null;
    try {
      imagePreloader = fs.readFileSync(paths.imagePreloaderTemplate, 'utf8');
    } catch (err) {
      imagePreloader = '';
      console.warn(chalk.yellow(
        `There was an error loading the image preloader template:\n${err}`,
      ));
    }

    Handlebars.registerPartial(
      'imagePreloader',
      imagePreloader,
    );

    let ffo = '';
    try {
      ffo = fs.readFileSync(paths.fontFaceObserverTemplate, 'utf8');
    } catch (err) {
      ffo = '';
      console.warn(chalk.yellow(
        `There was an error loading the font loader template:\n${err}`,
      ));
    }

    Handlebars.registerPartial(
      'fontFaceObserver',
      ffo,
    );

    let fl = null;
    try {
      fl = fs.readFileSync(paths.fontLoaderTemplate, 'utf8');
    } catch (err) {
      fl = '';
      console.warn(chalk.yellow(
        `There was an error loading the font loader template:\n${err}`,
      ));
    }

    Handlebars.registerPartial(
      'fontLoader',
      fl,
    );

    let ff = null;
    try {
      ff = fs.readFileSync(paths.fontAutogeneratedStyle, 'utf8');
      ff = csso.minify(ff).css || ff;
    } catch (err) {
      ff = '';
      console.warn(chalk.yellow(
        `There was an error loading the autogenerated font style:\n${err}`,
      ));
    }

    Handlebars.registerPartial(
      'fontFaces',
      ff,
    );
  }

  apply = (compiler) => {
    compiler.hooks.compilation.tap('AcceleratorHandlebarsPlugin', (compilation) => {
      const htmlPluginHooks = this.htmlPlugin.getHooks(compilation);

      htmlPluginHooks.beforeEmit.tap(
        'AcceleratorHandlebarsPlugin',
        (data) => {
          const templatingData = getTemplatingData(this.config);
          const templateFunc = Handlebars.compile(data.html);
          const baseHtml = templateFunc(templatingData);
          const minifiedHtml = minify(baseHtml, {
            caseSensitive: true,
            collapseBooleanAttributes: false,
            collapseWhitespace: true,
            html5: true,
            minifyCSS: false,
            minifyJS: false,
          });

          data.html = minifiedHtml;
        },
      );
    });
  };
}
