/**
 * Created by LLuo on 09/09/2016.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var runSequence = require('run-sequence');
var rename = require("gulp-rename");

// Static Server
gulp.task('_browser-sync',function(){
    browserSync.init({
        server: {
            baseDir: "./app",
            routes:    {
                "/app":              __dirname,
                "/bower_components": __dirname + "/bower_components",
                "/i18n":             __dirname + "/app/i18n",
                "/mock":             __dirname + "/mock"
            }
        }
    });
});

gulp.task('_watch', ['_browser-sync'], function () {
    gulp.watch("*").on('change', function () {
        runSequence('_copy_index', '_copy_api', function() {
            browserSync.reload();
        });
        gulp.start('_copy_index');
    });
});

gulp.task('_copy_index', function(){
    return gulp.src("./index.html")
        .pipe(gulp.dest("./app"));
});

gulp.task('_copy_api_development', function(){
    return gulp.src("./api.development.json")
        .pipe(rename("./api.json"))
        .pipe(gulp.dest("./app"));
});

// gulp.task('build_production', ["_copy_index", "_copy_api_development"], function(){
//     gulp.start('_watch');
// });

gulp.task('default', ["_copy_index", "_copy_api_development"], function(){
    gulp.start('_watch');
});