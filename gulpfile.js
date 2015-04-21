var gulp = require('gulp'),
    server = require('gulp-express'),
    refresh = require('gulp-livereload'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    jade = require('gulp-jade'),
    order = require("gulp-order"),
    concat = require("gulp-concat");
    // server = require('./app')(livereloadport);

// liverelod server
// var lr = require('tiny-lr');
// var lrserver = lr();

// var livereloadport = 35729,
//     serverport = 4000;


gulp.task('app', function(){
  return gulp.src('source/application/**/*.js')
    .pipe(order([
      'source/application/luckystore.js',
      'source/application/**/*.js'
    ]))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(server.notify())
    // .pipe(refresh(lrserver))
    .pipe(notify({ message: 'App js task complete' }));
})

gulp.task('styles:main', function(){
  return gulp.src('source/styles/main/style.less')
    .pipe(less()).on("error", notify.onError("Error: <%= error.message %>"))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/css'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(server.notify())
    // .pipe(refresh(lrserver))
    .pipe(notify({ message: 'Styles task complete' }));
})

gulp.task('styles:bootstrap', function(){
  return gulp.src('source/styles/bootstrap/bootstrap.less')
    .pipe(less()).on("error", notify.onError("Error: <%= error.message %>"))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/css'))
    // .pipe(minifycss())
    // .pipe(gulp.dest('dist/css'))
    .pipe(server.notify())
    // .pipe(refresh(lrserver))
    .pipe(notify({ message: 'Bootstrap styles task complete' }));
})

gulp.task('views', function(){
  return gulp.src('source/views/index.jade')
      .pipe(jade({
          locals: {}  
      }))
      .on('error', notify.onError("Error: <%= error.message %>"))
      .pipe(gulp.dest('dist/'))
      .pipe(server.notify())
      // .pipe(refresh(lrserver))
      .pipe(notify({ message: 'Views jade task complete' }));
})


gulp.task('build',['styles:main','styles:bootstrap','app','views']);

gulp.task('watch', function(){

  server.run(['app.js']);

  // server.listen(serverport, function() {
  //   console.log('server started, port',serverport);
  //   lrserver.listen(livereloadport);
  // })

  gulp.watch(['source/application/**/*.js'],['app']);

  gulp.watch(['source/styles/main/**/*.less'],['styles:main']);

  gulp.watch(['source/styles/bootstrap/**/*.less'],['styles:bootstrap']);

  gulp.watch(['source/views/**/*.jade'],['views']);
});