/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";
console.log("main/controllers/home.js loaded.");

liApp.controller(
    'mainHomeController',
    ['$scope', 
        function ($scope) {
            $scope.aaa = {"a": "mainHomeController"};

            
        }
    ]
);