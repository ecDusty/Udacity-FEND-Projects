/**
 * Dev Packages for running Gulp
 */

// Main Gulp
import { src, dest, parallel, series, watch } from 'gulp';

// =======
// Custom Packages

import del from 'del';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import flatten from 'gulp-flatten';
import browserSync from 'browser-sync';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import notifier from 'node-notifier';
import sftp from 'gulp-sftp-up4';
import fs from 'fs';
import parseArgs from 'minimist';
import through from 'through2';
import gulpif from 'gulp-if';
import sassInheritance from 'gulp-sass-inheritance';
import cached from 'gulp-cached';
import bro from 'gulp-bro';
import babelify from 'babelify';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import log from 'fancy-log';
import colors from 'ansi-colors';
/**
 * Configuration Object
 * any arguments & settings for gulp to run
 */

const config = {
	dir: './src/',
	dist: './dist/',
	env: parseArgs(process.argv).env,
	browserSyncServerDir: ['./dist'],
	browserSync: {
		server: config.browserSyncServerDir,
		https: false,
	},
};

/**
 * Terminal Log Configuration
 * styles which will make the Gulp log easier to read
 */

log(colors.cyan('config.env: '), config.env);
log(colors.cyan('config.browserSync: '), config.browserSync);


/**
 * In case of no action needed, run nada()
 */
const nada = () => through.obj();


/**
 * Server
 */
const initBrowserSync = () => browserSync.init(config.browserSync);


/**
 * Styles
 */
const css =
	() => src(`${config.inputDir}/**/*.scss`)
		.pipe(gulpif(global.isWatching, cached('css')))
		.pipe(sassInheritance({
			dir: `${config.inputDir}`
		}))
		.pipe(
			(config.env === 'production')
				? nada()
				: sourcemaps.init()
		)
		.pipe(sourcemaps.identityMap())
		.pipe(
			sass
				.sync({
					sourceComments: true,
					includePaths: ['node_modules/'],
				})
				.on('error', function errorHandler(err) {
					log(colors.red(`ERROR (sass): ${err.message}`));
					notifier.notify({
						title: 'Compile Error',
						message: err.message,
						sound: true,
					});
					this.emit('end');
				}),
		)
		.pipe(autoprefixer())
		.pipe(
			(config.env === 'production')
				? sass({
					outputStyle: 'compressed',
				})
				: nada(),
		)
		.pipe(
			(config.env === 'production')
				? nada()
				: sourcemaps.write()
		)
		.pipe(flatten())
		.pipe(dest(`${config.dist}css/`))
		.pipe(config.env === 'local' ? browserSync.stream() : nada());