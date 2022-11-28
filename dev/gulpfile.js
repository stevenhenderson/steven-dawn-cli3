'use strict';

const gulp = require('gulp'),
    rename = require("gulp-rename"),
    sass = require('gulp-sass')(require('sass')),
    args = require('yargs').argv,
    bump = require('gulp-bump');

/**
 * Asset paths.
*/
const srcStyles = 'styles/**/*.scss',
    assetsDir = '../assets/',
    snippetsDir = '../snippets/',
    devDir = '../dev/';

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
 * Theme build version
*/
gulp.task('bump', function() {
    /// <summary>
    /// It bumps revisions
    /// Usage:
    /// 1. gulp bump : bumps the build.json to the next minor revision.
    ///   i.e. from 0.1.1 to 0.1.2
    /// 2. gulp bump --version 1.1.1 : bumps/sets the build.json to the 
    ///    specified revision.
    /// 3. gulp bump --type major       : bumps 1.0.0 
    ///    gulp bump --type minor       : bumps 0.1.0
    ///    gulp bump --type patch       : bumps 0.0.2
    ///    gulp bump --type prerelease  : bumps 0.0.1-2
    /// </summary>

    var type = args.type;
    var version = args.version;

    var options = {};
    if (version) {
        options.version = version;

    } else {
        options.type = type;
    }

    var buildPath = gulp
        .src('package.json')
        .pipe(bump(options))
        .pipe(gulp.dest(devDir));

    return buildPath;
});

/**
 * Theme snippet version
*/
gulp.task('snippet', function(done) {
    var fs = require('fs');

    // Set version number as string
    var pckg = require('./package.json');
    var num_version = pckg.version;

    // Write version number to theme snippet
    fs.writeFile(snippetsDir + '/_build.liquid', num_version, (error) => { /* handle error */ });

    done();
});

/**
 * Watch task
*/
gulp.task('watch', () => {
    gulp.watch(srcStyles, gulp.series('styles', 'bump', 'snippet'));
});

/**
 * Default task
*/
gulp.task('default', gulp.series('styles', 'bump', 'snippet', 'watch'));