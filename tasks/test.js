'use strict';

let gulp = require('gulp'),
    mocha = require('gulp-mocha');


module.exports = function (gulp, $) {
    'use strict';

    gulp.task('test', function () {
        return gulp.src(['test/**/*.js'])
            .pipe(mocha({
                timeout: 6000,
                'check-leaks': true,
                ui: 'bdd',
                reporter: 'tap' //spec, tap
            }));
    });
};
