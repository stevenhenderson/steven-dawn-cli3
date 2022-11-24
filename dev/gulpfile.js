'use strict';

const gulp = require('gulp'),
    rename = require("gulp-rename"),
    sass = require('gulp-sass')(require('sass'));

/**
 * Asset paths.
*/
const srcStyles = 'styles/**/*.scss',
    assetsDir = '../assets/';

/**
 * Scss lint
*/
gulp.task('scss-lint', () => {
    return gulp.src(srcStyles);
});

/**
 * Base Styles
 * Core styling that should be needed on all pages.
*/
gulp.task(
    'styles',
    gulp.series('scss-lint', () => {
        return gulp
            // Gather scss from theme.scss includes
            .src('styles/base.scss')
            // Combine theme.scss without sass compression and rename to non-minified file
            .pipe(sass().on('error', sass.logError))
            .pipe(rename('base.css'))
            .pipe(gulp.dest(assetsDir))
            // Combine theme.scss with sass compression and rename to minified file
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename('base.min.css'))
            .pipe(gulp.dest(assetsDir));
    })
);

/**
 * Watch task
*/
gulp.task('watch', () => {
    gulp.watch(srcStyles, gulp.series('styles'));
});

/**
 * Default task
*/
gulp.task('default', gulp.series('styles', 'watch'));