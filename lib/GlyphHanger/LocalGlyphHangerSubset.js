import chalk from 'chalk';
import {
	exec,
} from 'child_process';
import {
	error,
	log,
} from 'colorful-logging';
import debug from 'debug';
import filesize from 'filesize';
import {
	stat,
} from 'fs-extra';
import glob from 'glob';
import GlyphHangerFormat from 'glyphhanger/src/GlyphHangerFormat';
import parsePath from 'parse-filepath';
import * as path from 'path';

debug('glyphhanger:subset');

export class LocalGlyphHangerSubset {
	constructor() {
		this.formats = new GlyphHangerFormat();
	}

	setOutputDirectory = (outputDir) => {
		this.outputDirectory = outputDir;
	}

	getOutputDirectory = () => this.outputDirectory;

	setFontFilesGlob = (ttfFilesGlob) => new Promise((resolve, reject) => (
		glob(ttfFilesGlob, (err, matches) => {
			if (err) {
				return reject(err);
			}

			this.fontPaths = matches;
			return resolve();
		})
	));

	setFontFiles = (ttfFontFiles) => this.fontPaths = ttfFontFiles;

	setFormats = (formatsString) => (
		formatsString && this.formats.setFormats(formatsString)
	);

	getPath = (filePath, dir) => dir ? path.join(dir, filePath) : filePath;

	getPaths = () => this.fontPaths;

	getSrcsObject = (ttfPath, dir) => {
		const srcs = {};
		if (this.formats.hasFormat('woff2')) {
			srcs.woff2 = this.getPath(
				this.getFilenameFromTTFPath(ttfPath, 'woff2'),
				dir,
			);
		}

		if (this.formats.hasFormat('woff-zopfli')) {
			srcs.woff = this.getPath(
				this.getFilenameFromTTFPath(ttfPath, 'woff', true),
				dir,
			);
		} else if (this.formats.hasFormat('woff')) {
			srcs.woff = this.getPath(
				this.getFilenameFromTTFPath(ttfPath, 'woff'),
				dir,
			);
		}

		if (this.formats.hasFormat('ttf')) {
			srcs.truetype = this.getPath(this.getFilenameFromTTFPath(ttfPath), dir);
		}

		return srcs;
	};

	getFilenames = (ttfPath, dir) => {
		const files = [];
		if (this.formats.hasFormat('ttf')) {
			files.push(this.getPath(this.getFilenameFromTTFPath(ttfPath), dir));
		}

		if (this.formats.hasFormat('woff')) {
			files.push(
				this.getPath(this.getFilenameFromTTFPath(ttfPath, 'woff'), dir),
			);
		}

		if (this.formats.hasFormat('woff-zopfli')) {
			files.push(
				this.getPath(this.getFilenameFromTTFPath(ttfPath, 'woff', true), dir),
			);
		}

		if (this.formats.hasFormat('woff2')) {
			files.push(
				this.getPath(this.getFilenameFromTTFPath(ttfPath, 'woff2'), dir),
			);
		}

		return files;
	};

	getFilenameFromTTFPath = (ttfPath, format, useZopfli) => {
		const fontPath = parsePath(ttfPath);
		const outputFilename = `${fontPath.name}-subset` +
			`${useZopfli ? '.zopfli' : ''}${format ? '.' + format : fontPath.ext}`;

		return outputFilename;
	};

	subsetAll = (unicodes) => this.fontPaths.forEach((fontPath) => {
		const proms = [];

		if (this.formats.hasFormat('ttf')) {
			proms.push(this.subset(fontPath, unicodes));
		}

		if (this.formats.hasFormat('woff')) {
			proms.push(this.subset(fontPath, unicodes, 'woff', false));
		}

		if (this.formats.hasFormat('woff-zopfli')) {
			proms.push(this.subset(fontPath, unicodes, 'woff', true));
		}

		if (this.formats.hasFormat('woff2')) {
			proms.push(this.subset(fontPath, unicodes, 'woff2'));
		}

		return Promise.all(proms);
	});

	subset = async (inputFile, unicodes, format, useZopfli) => {
		const outputFilename = this.getFilenameFromTTFPath(inputFile, format, useZopfli);
		const outputDir = this.outputDirectory || parsePath(inputFile).dir;
		const outputFullPath = path.join(outputDir, outputFilename);
		const cmd = [
			'pyftsubset',
			`'${inputFile}'`,
			`--output-file='${outputFullPath}'`,
			`--unicodes=${unicodes}`,
			`--layout-features='*'`,
		];

		if (format) {
			cmd.push(`--flavor=${format.toLowerCase()}`);

			if (/^woff$/i.test(format) && useZopfli) {
				cmd.push('--with-zopfli');
			}
		}

		const command = cmd.join(' ');
		debug('command: %o', command);

		const prom = new Promise((resolve, reject) => {
			const proc = exec(command, null, (err) => {
				if (err) {
					return reject(`Error: pyftsubset command failed (${command}).`);
				}

				return resolve();
			});

			proc.stderr.pipe(process.stderr);
			proc.stdout.pipe(process.stdout);
		});

		prom.catch((err) => { throw new Error(err); });

		await prom;

		if (!unicodes) {
			log(
				`Warning: the unicode range for ${outputFilename} was empty! Is ` +
					`your --family wrong? Was your URL empty?`
			);
		}

		const { size: inputSize } = await stat(inputFile);
		const { size: outputSize } = await stat(outputFullPath);
		log(
			`Subsetting ${inputFile} to ${outputFilename} ` +
				`(was ${chalk.red(filesize(inputSize))}, ` +
				`now ${chalk.green(filesize(outputSize))}).`,
		);
	};
}
