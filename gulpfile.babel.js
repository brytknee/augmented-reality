import gulp from 'gulp';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import del from 'del';
import gulpif from 'gulp-if';
import yargs from 'yargs';

const argv = yargs.argv;

const config = {
	html: {
		source: './src/**/*.html',
		destination: './dist'
	},
	styles: {
		source: './src/styles/**/*.scss',
		destination: './dist',
		browsers: ['last 2 versions', 'ie >= 9']
	},
	scripts: {
		source: './src/scripts/**/*.js',
		destination: './dist'
	},
	extras: {
		source: './src/**/*.{htaccess}',
		destination: './dist'
	},
	browserSync: {
		port: 5000,
		server: './dist'
	}
};

export function styles() {
	return gulp.src(config.styles.source)
		.pipe(plumber())
		.pipe(gulpif(!argv.prod, sourcemaps.init()))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: config.styles.browsers
		}))
		.pipe(gulpif(argv.prod, cssnano()))
		.pipe(concat('bundle.css'))
		.pipe(gulpif(!argv.prod, sourcemaps.write('.')))
		.pipe(gulp.dest(config.styles.destination));
}

export function scripts() {
	return gulp.src(config.scripts.source)
		.pipe(plumber())
		.pipe(gulpif(!argv.prod, sourcemaps.init()))
		.pipe(babel())
		.pipe(gulpif(argv.prod, uglify()))
		.pipe(concat('bundle.js'))
		.pipe(gulpif(!argv.prod, sourcemaps.write('.')))
		.pipe(gulp.dest(config.scripts.destination));
}
	
export function html() {
	return gulp.src(config.html.source)
		.pipe(plumber())
		.pipe(gulp.dest(config.html.destination));
}
	
export function extras() {
	return gulp.src(config.extras.source)
		.pipe(plumber())
		.pipe(gulp.dest(config.extras.destination));
}
	
export function serve() {
	browserSync.init(config.browserSync);

	gulp.watch(config.html.source, html);
	gulp.watch(config.styles.source, styles);
	gulp.watch(config.scripts.source, scripts);
}

export const clean = () => del(['dist']);

const tasks = gulp.parallel(styles, scripts, html, extras);
export const build = gulp.series(clean, tasks);