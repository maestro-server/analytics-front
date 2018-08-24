'use strict';

let browserify = require('browserify');
let gulp = require('gulp');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');



module.exports = function (gulp, $) {
    'use strict';

    gulp.task('compile', function() {

        return browserify('./assets/js/main.js')
          .bundle()
          .on('error', function (error) {
            console.error(error.toString())
            this.emit('end')
          })
          .pipe(source('app.js')) // gives streaming vinyl file object
          .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
          .pipe(gulp.dest('./public/js'));
      });
};
