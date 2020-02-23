/* eslint-disable implicit-arrow-linebreak */
/**
 * Dev Packages for running Gulp
 */

// Main Gulp
import {
	src,
	dest,
	parallel,
	series,
	watch
} from 'gulp';

// =======
// Custom Packages

import del from 'del';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import data from 'gulp-data';
import autoprefixer from 'gulp-autoprefixer';
import flatten from 'gulp-flatten';
import browserSync from 'browser-sync';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import notifier from 'node-notifier';
// import sftp from 'gulp-sftp-up4';
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
import htmlmin from 'gulp-htmlmin';
import nunjucksRender from 'gulp-nunjucks-render';


/**
 * Configuration Object
 * any arguments & settings for gulp to run
 */
const config = {
	app: './app/',
	dist: './dist/',
	env: !parseArgs(process.argv).env ? 'localDev' : parseArgs(process.argv).env,
	browserSyncServerDir: ['./dist'],
	browserSync: {},
	syncWatching: false,
	nunjucks: {}
};

// Config BrowserSync config object
config.browserSync = {
	server: config.browserSyncServerDir,
	https: false,
};

// Website JSON data location
config.nunjucks.data = `${config.app}pages/data/`;

// Nunjucks settings
config.nunjucks.templates = [`${config.app}templates`];

/**
 * Terminal Log Configuration
 * styles which will make the Gulp easier to read
 */
log(colors.cyan('config.env: '), config.env);
log(colors.cyan('config.browserSync: '), config.browserSync);


/**
 * All Function Names Declaration
 * @nada - Empty function that always the stream content to continue
 * @initBrowserSync - Initializes BrowserSync, creating a local server
 * 		to host the development files, which gives you the ability to
 * 		test your website build
 * @sass - Compiles all the root SASS files, to produce the usable CSS
 * @js - Compiles all the root JS files, to produce the usable main.js file.
 * 		This also initiates
 * @images - For 'localDev', this moves images to 'dist/img/' folder. The reason
 * 		for this is to save, and shorten processing time. With
 * 		'production', the images will be minified and moved
 * @html - Compiles all the nunjucks templates into usable HTML pages, and
 * 		places them into the base 'dist/' folder for hosting.
 * @fonts - Moves all fonts to base font folder. 'dist/fonts'
 * @cleanUp - Deletes the dist folder. Helpful to ensure all files are only the
 * 		most updated version, and saving space when not actively developing.
 * @watchFiles - Watch for source file changes, and trigger a recreate & resync.
 */


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
const css = () =>
	src(`${config.app}/**/*.scss`)
		.pipe(gulpif(global.syncWatching, cached('css')))
		.pipe(sassInheritance({
			dir: `${config.app}`
		}))
		.pipe(
			(config.env === 'production')
				? nada()
				: sourcemaps.init()
		)
		.pipe(sourcemaps.identityMap())
		.pipe(sass
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
const js = () =>
	src(`${config.app}/js/*.js`)
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
const images = () =>
	src(`${config.app}/**/*.{jpg,jpeg,svg,png,gif}`)
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
		.pipe(config.env === 'localDev'
			? browserSync.stream()
			: nada());


/**
 * HTML compiling
 * The preprocessor removes development sections
 */
const htmlDataJSON = () => {
	const mainData = JSON.parse(fs.readFileSync(`${config.nunjucks.data}site.json`));
	return mainData;
};

const html = () =>
	src(`${config.app}/pages/**/*.html`) // .pipe(flatten())
		.pipe(data(htmlDataJSON()))
		.pipe(nunjucksRender({
			path: config.nunjucks.templates
		}))
		.pipe(config.env === 'localDev' ? nada() : htmlmin({ collapseWhitespace: true }))
		.pipe(dest(`${config.dist}`))
		.pipe(config.env === 'localDev' ? browserSync.stream() : nada());


/**
 * Fonts
 */
const fonts = () =>
	src(`${config.app}/**/*.{eot,ttf,woff,woff2}`)
		.pipe(flatten())
		.pipe(dest(`${config.dist}fonts/`))
		.pipe(config.env === 'localDev' ? browserSync.stream() : nada());


/**
 * Clean up files & folders
 */
const cleanUp = () => del(`${config.dist}`);


/**
* Watch
*/
function watchFiles() {
	global.syncWatching = true;
	watch([
		`${config.app}**/*.html`,
		`${config.app}**/*.njk`,
		`${config.app}**/**/*.njk`,
		`${config.app}**/**/**/*.njk`,
		`${config.app}**/*.nunjucks`,
		`${config.nunjucks.data}*.json`
	],
	series(html));
	watch(`${config.app}**/*.scss`, series(css));
	watch(`${config.app}**/*.js`, series(js));
}


/**
 * Gulp executables
 * These are the gulp functions
 */

// Default
exports.default = series(
	cleanUp,
	parallel(css, js, html, images),
	parallel(watchFiles, initBrowserSync)
);

// Live site builder
exports.production = series(
	cleanUp,
	parallel(css, js, html, images, fonts)
);

// HTML generator
exports.html = series(
	cleanUp,
	parallel(html)
);

// Clean up production
exports.cleanup = series(cleanUp);

// Create CSS files
exports.sass = series(css);
