'use strict';

let browserify = require('browserify');
let gulp = require('gulp');
let uglify = require('gulp-uglify-es').default;
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');


module.exports = function (gulp, $) {
    'use strict';

    gulp.task('build', function() {

        return browserify('./assets/js/main.js')
          .bundle()
          .pipe(source('app.js')) // gives streaming vinyl file object
          .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
          .pipe(uglify({mangle: false})) // now gulp-uglify works
          .pipe(gulp.dest('./public/js'));
      });
};
