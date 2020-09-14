const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const postcss = require("gulp-postcss");
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
const del = require('del');
const prettify = require('gulp-prettify');
const data = require('gulp-data');
const fs = require('fs');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');


const clean = () => {
  return del('build');
}

exports.clean = clean;

const copy = () => {
  return gulp.src([
    'work/fonts/**/*.{woff,woff2}',
    'work/img/**',
    'work/js/**',
  ], {
    base: "work"
  })
  .pipe(gulp.dest('build'));
}

exports.copy = copy;

const styles = () => {
  return gulp.src('./work/sass/style.scss')
    .pipe(plumber({
      errorHandler: notify.onError(function(err){
        return{
          title: 'Styles',
          message: err.message
        }
      })
    }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('styles.min.css'))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
}

exports.styles = styles;

const sprite = () => {
  return gulp.src('./work/img/**/{icon,flag}-*.svg')
    .pipe(svgstore())
    .pipe(rename('general.svg'))
    .pipe(gulp.dest('build/img'))
}

exports.sprite = sprite;

const gulpPug = () => {
  return gulp.src('./work/pug/pages/*.pug')
    .pipe(plumber({
      errorHandler: notify.onError(function(err){
        return{
          title: 'Pug',
          message: err.message
        }
      })
    }))
    .pipe(data(function(file) {
      return JSON.parse(
        fs.readFileSync('work/pug/data.json')
      )
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(prettify({
      indent_size: 2,
      indent_char: ' ',
      inline: [],
      end_with_newline: true
    }))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
}

exports.gulpPug = gulpPug;

const server = () => {
  browserSync.init({
    server: {
      baseDir: './build/'
    },
    cors: true,
    notify: false,
    ui: false,
  })
}

exports.server = server;

const watcher = () => {
  gulp.watch('work/pug/**/*.pug', gulpPug);
  gulp.watch('work/sass/**/*.scss', styles);
  gulp.watch('work/js/**/*.js', copyJS);
}

exports.watcher = watcher;

const copyJS = () => {
  return gulp.src('./work/js/**/*.js')
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}

exports.copyJS = copyJS;

const images = () => {
  return gulp.src('./work/img/**/*.{jpg,png,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
    ]))
}

exports.images = images;

const webpFunc = () => {
  return gulp.src('./work/img/**/*.{jpg,png}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('./build/img'))
}

exports.webp = webpFunc;

const build = gulp.series(
  clean,
  copy,
  styles,
  webpFunc,
  sprite,
  gulpPug
)

exports.build = build;

gulp.task('default', gulp.series(build, gulp.parallel(server, watcher)));