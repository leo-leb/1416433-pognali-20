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

function cleanSource(){
  return del('./source');
}

function gulpSass(){
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
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./source/css'))
    .pipe(browserSync.stream());
}

function gulpPug(){
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
    .pipe(gulp.dest('./source'))
    .pipe(browserSync.stream());
}

function copyJS(){
  return gulp.src('./work/js/**/*.js')
    .pipe(gulp.dest('./source/js'))
    .pipe(browserSync.stream());
}
function copySass(){
  return gulp.src('work/sass/**/*.*')
    .pipe(gulp.dest('./source/sass'))
    .pipe(browserSync.stream());
}
function copyLibs(){
  return gulp.src('work/libs/**/*.*')
    .pipe(gulp.dest('./source/libs'))
    .pipe(browserSync.stream());
}
function copyImg(){
  return gulp.src('work/img/**/*.*')
    .pipe(gulp.dest('./source/img'))
    .pipe(browserSync.stream());
}
function copyFonts(){
  return gulp.src('work/fonts/**/*.*')
    .pipe(gulp.dest('./source/fonts'))
    .pipe(browserSync.stream());
}

function gulpServer(){
  browserSync.init({
    server: {
      baseDir: './source/'
    },
    cors: true,
    notify: false,
    ui: false,
  })
}

function gulpWatch(){
  gulp.watch('work/pug/**/*.pug', gulpPug);
  gulp.watch('work/sass/**/*.scss', gulpSass);
  gulp.watch('work/js/**/*.js', copyJS);
  gulp.watch('work/libs/**/*.*', copyLibs);
  gulp.watch('work/img/**/*.*', copyImg);
  gulp.watch('work/fonts/**/*.*', copyFonts);
}

gulp.task('default', gulp.series(cleanSource, gulpSass, gulpPug, gulp.parallel(copyJS, copySass, copyLibs, copyImg, copyFonts), gulp.parallel(gulpServer, gulpWatch)));
