var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create(),
reload = browserSync.reload,
autoprefixer = require('gulp-autoprefixer'),
sass = require('gulp-sass'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
uglify = require('gulp-uglify'),
cssnano = require('gulp-cssnano'),
imagemin = require('gulp-imagemin'),
cache = require('gulp-cache'),
del = require('del'),
runSequence = require('run-sequence');

// Default Task
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
});

gulp.task('watch', ['browserSync', 'sass'], function() {

    gulp.watch('app/assets/styles/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload); 
    gulp.watch('app/assets/scripts/**/*.js', browserSync.reload); 
});

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function () {
    return gulp.src('app/assets/styles/**/*.scss')
        .pipe(sass({     
            includePaths: require('node-normalize-scss').includePaths
        }))
        // Prevents watch task from quitting on CSS error
        .on('error', function(errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
         .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: 'app'
    },
  })
});

// Gulp Build Task 

gulp.task('previewDist', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "dist"
    }
  });
});

gulp.task('deleteDistFolder', function() {
  return del('./dist');
});

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
  return gulp.src('./app/assets/images/**/*')
  .pipe(imagemin({
    progressive: true,
    interlaced: true,
    multipass: true
  }))
  .pipe(gulp.dest('./dist/assets/images'))
});

gulp.task('usemin', ['deleteDistFolder', 'sass'], function() {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      // Revision and Compress CSS and JS
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['deleteDistFolder', 'optimizeImages', 'usemin']);