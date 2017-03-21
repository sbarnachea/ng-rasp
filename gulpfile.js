/*!
 * Gulpfile
 * since 2015-01-26
 * author Raúl Hernández <rhernandez@eclass.cl>, Juan Pablo Barrientos <jbarrientos@eclass.cl>
 */

var argv = require('minimist')(process.argv.slice(2));
var RELEASE = !!argv.dist; // Minimize and optimize during a build?
var sassOutputStyle = RELEASE ? 'compressed' : 'nested';
var runSequence = require('run-sequence');
var watch = false;
var merge = require('merge-stream');

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    src = './app/src',
    dist = './app/dist',
    bower = './bower_components';

// Compile Styles
gulp.task('styles', function() {
    var AUTOPREFIXER_BROWSERS = [
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ie >= 9',
        'ie_mob >= 10',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10',
    ];

    gulp.src(src + '/styles/styles.scss')
        .pipe($.if(RELEASE,
            $.sass.sync({
                errLogToConsole: false,
                onError: function(err) {
                    return $.notify().write(err);
                },
            }).on('error', $.sass.logError),
            $.sass.sync({
                sourceComments: 'normal',
                outputStyle: sassOutputStyle,
                errLogToConsole: false,
                onError: function(err) {
                    return $.notify().write(err);
                },
            }).on('error', $.sass.logError)
        ))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest(dist + '/styles'))
        .pipe($.size({title: 'Size CSS:', showFiles: true}))
        .pipe($.if(RELEASE, $.size({title: 'Size CSS:', gzip:true, showFiles: true})))
        .pipe($.if(RELEASE, $.cssnano()))
        .pipe($.if(RELEASE, $.replace('/*!', '/*'))) // remove special comments
        .pipe($.if(RELEASE, $.stripCssComments())) // remove comments
        .pipe($.if(RELEASE, $.rename('styles.min.css')))
        .pipe(gulp.dest(dist + '/styles'));
        //.pipe($.if(!RELEASE, $.livereload()));
});

// Compile Scripts
gulp.task('scripts', function() {
    /**
     * App scripts
     */
    var APP_SCRIPTS = [
        src + '/scripts/**/*.js'
    ];

    gulp.src(APP_SCRIPTS)
        .pipe($.concat('scripts.js'))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(dist + '/scripts'))
        .pipe($.if(RELEASE, $.uglify({mangle: false}).on('error', $.util.log)))
        .pipe($.if(RELEASE, $.stripDebug()))
        .pipe($.size({ title: 'Size JS:' }))
        .pipe($.if(RELEASE, $.rename('scripts.min.js')))
        .pipe(gulp.dest(dist + '/scripts'));
});

// Validate JS
gulp.task('jshint', function() {
    gulp.src(src + '/scripts/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'));
});

/**
 * The default task
 */
gulp.task('default', ['build', 'watch']);

/**
 * The build task
 */
gulp.task('build', function(cb) {
    runSequence(['styles', 'scripts', 'jshint'], cb);
});

/**
 * The watch task
 */
gulp.task('watch', function() {
    //$.livereload.listen();
    gulp.watch(src + '/styles/**/*.scss', ['styles']);
    gulp.watch(src + '/scripts/**/*.js', ['scripts']);
    watch = true;
});
