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
	dir: './app/',
	dist: './dist/',
	env: !parseArgs(process.argv).env ? 'local' : parseArgs(process.argv).env,
	browserSyncServerDir: ['./dist'],
	browserSync: {},
	syncWatching: false,
};

config.browserSync = {
	server: config.browserSyncServerDir,
	https: false,
}

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
		.pipe(gulpif(global.syncWatching, cached('css')))
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
				}))
		.pipe(autoprefixer())
		.pipe(config.env === 'production'
			? sass({ outputStyle: 'compressed', })
			: nada())
		.pipe(config.env === 'production'
			? nada()
			: sourcemaps.write())
		.pipe(flatten())
		.pipe(dest(`${config.dist}css/`))
		.pipe(config.env === 'localDev'
			? browserSync.stream()
			: nada());


/**
 * JAVASCRIPT COMPILING
 */
const js =
	() => src(`${config.inputDir}/js/*.js`)
		.pipe(bro({
			debug: true,
			transform: [
				babelify.configure({
					presets: [
						[
							'@babel/preset-env',
							{ useBuiltIns: 'usage' }
						]
					]
				})
			],
		}))
		.pipe(gulpif(global.syncWatching, cached('js')))
		.pipe(buffer())
		.pipe((config.env === 'production')
			? uglify()
			: nada())
		.pipe(dest(`${config.dist}js/`))
		.pipe(config.env === 'localDev'
			? browserSync.stream()
			: nada());


/**
 * IMAGE COMPILING
 * Images are only minified for production, not local development
 */

const images =
	() => src(`${config.inputDir}/**/*.{jpg,jpeg,svg,png,gif}`)
		.pipe(config.env === 'localDev'
			? imagemin({
				progressive: true,
				svgoPlugins: [{
					removeViewBox: false,
				}],
				use: [pngquant()],
			})
			: nada())
		.pipe(flatten())
		.pipe(dest(`${config.dist}img/`))
		.pipe(config.env === 'local'
			? browserSync.stream()
			: nada());


/**
 * HTML compiling
 * The preprocessor removes development sections
 */

const html =
	() => src(`${config.inputDir}/**/*.html`)
		.pipe(flatten())
		.pipe(dest(`${config.dist}`))


/**
 * Fonts
 */

const fonts =
	() => src(`${config.inputDir}/**/*.{}`)

/**
 * Clean up files & folders
 */

const cleanUp = () => del(`${config.dist}`);



/**
* Watch
*/

function watchFiles() {
	global.syncWatching = true;
	watch(`${config.browserSyncServerDir[0]}**/*.html`, series(html));
	watch(`${config.inputDir}**/*.scss`, series(css));
	watch(`${config.inputDir}**/*.js`, series(js));
}

/**
 * Gulp Executables
 * These are the gulp functions
 */

 exports.default = series(
	 cleanUp,
	 parallel(css, js, html, images),
	 parallel(watchFiles, initBrowserSync)
);

//  exports.production = series();

 exports.html = series(
	cleanUp,
	parallel(html)
 );