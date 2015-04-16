var gulp = require('gulp'),
    server = require('gulp-express'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    jade = require('gulp-jade'),
    order = require("gulp-order"),
    concat = require("gulp-concat");


gulp.task('app', function(){
  return gulp.src('source/application/**/*.js')
    .pipe(order([
      'source/application/luckystore.js',
      'source/application/**/*.js'
    ]))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'App task complete' }));
})

gulp.task('styles', function(){
  return gulp.src('source/less/style.less')
    .pipe(less()).on("error", notify.onError("Error: <%= error.message %>"))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/css'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(server.notify())
    .pipe(notify({ message: 'Styles task complete' }));
})

gulp.task('views', function(){
  return gulp.src('source/views/index.jade')
      .pipe(jade({
          locals: {}  
      }))
      .on('error', notify.onError("Error: <%= error.message %>"))
      .pipe(gulp.dest('dist/'))
      .pipe(server.notify())
      .pipe(notify({ message: 'Views task complete' }));
})

gulp.task('build',function(){
  gulp.run('styles','views')
});

gulp.task('watch', function(){
  server.run(['app.js']);
  

  gulp.watch(['source/application/**/*.js'],function(e){
      gulp.run('app');
  });

  gulp.watch(['source/less/**/*.less'],function(e){
      gulp.run('styles');
  });
  gulp.watch(['source/views/**/*.jade'],function(e){
      gulp.run('views');
  });
});