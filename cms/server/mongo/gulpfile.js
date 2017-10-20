/**
 * Created by LLuo on 09/09/2016.
 */
var isWin = /^win/.test(process.platform);

var gulp = require('gulp');
var exec = require('child_process').exec;
var nodemon = require('gulp-nodemon'); // execute command like 'node server.js' in this case
var browserSync = require('browser-sync').create();

var runSequence = require('run-sequence');
var rename = require("gulp-rename");


// ===============================================================================================================
// ===============================================================================================================
// ===============================================================================================================
// Task Starts ===================================================================================================





// ===============================================================================================================
// daily ======================================================================================================
gulp.task('default', ["serve-local"], function(){

});


//will refresh express when code changes
gulp.task('express localhost:8888',['build-local'], function (cb) {
    var started = false;

    return nodemon({
        script: 'server.js'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
    // note: use ignore **/* to disable nodemon watch function, this will allow browser-sync do proxy without break.
});
// default ends ===================================================================================================


// ===============================================================================================================
// Global Tasks ==================================================================================================

gulp.task('==== Global Tasks ====', function(){
    return gulp;
});

gulp.task('_copy_index', function(){
    return gulp.src("./index.html")
        .pipe(gulp.dest("./app"));
});
// Global Tasks ends ==============================================================================================




// ===============================================================================================================
// Development Env ===============================================================================================

gulp.task('==== Development ====', function(){
    return gulp;
});

// Static Server
gulp.task('_browser-sync',function(){
    browserSync.init({
        server: {
            baseDir: "./app",
            routes:    {
                "/app":              __dirname,
                "/mock":             __dirname + "/mock"
            }
        }
    });
});

gulp.task('_watch', ['_browser-sync'], function () {
    gulp.watch(['*', 'app/src/**/*']).on('change', function () {
        runSequence('build-development', function() {
            browserSync.reload();
        });
    });
});



gulp.task('_copy_api_development', function(){
    return gulp.src("./api.development.json")
        .pipe(rename("./api.json"))
        .pipe(gulp.dest("./app"));
});

//development
gulp.task('build-development', ["_copy_index", "_copy_api_development"], function(){
    return gulp;
});

gulp.task('serve-development', ["build-development"], function(){
    gulp.start('_watch');
});
// Development Env ends ======================================================================================


// ===============================================================================================================
// Local Express server ==========================================================================================

gulp.task('==== Local ExpressJS ====', function(){
    return gulp;
});

gulp.task('_local-server',function(){
    browserSync.init({
        proxy: {
            target: "localhost:8888"
        },
        port: 4000
    });
});

gulp.task('_watch_local', ['_local-server'], function () {
    gulp.watch(['*', 'app/src/**/*']).on('change', function () {
        runSequence('build-local', function() {
            browserSync.reload();
        });
    });
});

gulp.task('_copy_api_local', function(){
    return gulp.src("./api.local.json")
        .pipe(rename("./api.json"))
        .pipe(gulp.dest("./app"));
});

gulp.task('build-local', ["_copy_index", "_copy_api_local"], function(){
    return gulp;
});

// serve localhost:8888 with expressJS.
// use nodemon to start api (express) server
gulp.task('serve-express', ['build-local'], function (cb) {

    var started = false;

    return nodemon({
        script: 'server.js',
        "ignore": ["**/*"]
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
    // note: use ignore **/* to disable nodemon watch function, this will allow browser-sync do proxy without break.
});

// Proxy express port 8888 to 4000
// watch file changes and auto-reload
gulp.task('serve-local',['serve-express'], function(){
    gulp.start('_watch_local');

});
// Local Express server ends =====================================================================================



















// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
// ==============================================================================================================
//
//  ExpressJS + ReactJS
gulp.task('==================================', function(){
    return gulp;
});
gulp.task('==== ========================= ====', function(){
    return gulp;
});
gulp.task('==== ========= ReactJS ========== ====', function(){
    return gulp;
});


gulp.task('_copy_index_for_reactjs', function(){
    return gulp.src("./index_reactjs.html")
        .pipe(rename("./index.html"))
        .pipe(gulp.dest("./app_reactjs"));
});

gulp.task('---- Local ExpressJS + ReactJS ----', function(){
    return gulp;
});

gulp.task('_copy_api_local_for_reactjs', function(){
    return gulp.src("./api.local.json")
        .pipe(rename("./api.json"))
        .pipe(gulp.dest("./app_reactjs"));
});

gulp.task('build-local-for-reactjs', ["_copy_index_for_reactjs", "_copy_api_local_for_reactjs"], function(){
    return gulp;
});

gulp.task('express for reactjs localhost:8888',['build-local-for-reactjs'], function (cb) {
    var started = false;

    return nodemon({
        script: 'server-reactjs.js'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
    // note: use ignore **/* to disable nodemon watch function, this will allow browser-sync do proxy without break.
});