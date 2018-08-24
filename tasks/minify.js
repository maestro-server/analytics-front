'use strict';

let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');

module.exports = function (gulp, $) {
    'use strict';

    gulp.task('minify', () => {
      return gulp.src('assets/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'));
    });
};
