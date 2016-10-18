/**
 * Created by LLuo on 09/09/2016.
 */
'use strict';
console.log("app.js loaded.");

var app = angular.module(
    'liApp',
    [
        'ngRoute',
        'ngResource',
        'ui.router',
        'pascalprecht.translate',
        'textAngular',
        'ui.tinymce',
        'angularUtils.directives.dirPagination',
        'chart.js',
        'ngAlertify'
    ]
); // 'ui.tinymce',

