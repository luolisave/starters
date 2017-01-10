/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";
console.log("main/controllers/body.js loaded.");

liApp.controller(
    'bodyController',
    ['$scope','$rootScope',
        function($scope, $rootScope) {
            $scope.aaa = {"a":"bodyController"};
        }
    ]
);