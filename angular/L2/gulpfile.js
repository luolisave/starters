/**
 * Created by LLuo on 09/09/2016.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var runSequence = require('run-sequence');
var rename = require("gulp-rename");

var less = require('gulp-less');
var path = require('path');

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
        },
        host:"0.0.0.0",
        port:8080
    });
    //,
    //    port:8082,
    //    https:true
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

gulp.task('_compile_less', function () {
  return gulp.src('./app/assets/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./app/assets/css'));
});

// gulp.task('build_production', ["_copy_index", "_copy_api_development"], function(){
//     gulp.start('_watch');
// });

gulp.task('serve-development', ["_copy_index", "_copy_api_development", "_compile_less"], function(){
    gulp.start('_watch');
});

gulp.task('default', ["serve-development"], function(){  // "_copy_index", "_copy_api_development", "_compile_less"
    
});