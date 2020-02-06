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
import browserSync from 'browser-sync';