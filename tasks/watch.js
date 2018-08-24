'use strict';

let gulp = require('gulp'),
    mocha = require('gulp-mocha');


module.exports = function (gulp, $) {
    'use strict';

    gulp.task('watch', function() {
        return gulp.watch(['assets/js/**/*.js','assets/css/**/*.css'], ['compile', 'minify']);
    })
};
