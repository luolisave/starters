/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";
console.log("main/controllers/body.js loaded.");

app.controller(
    'bodyController',
    ['$scope','$rootScope','$translate','API', 'UserService',
        function($scope, $rootScope, $translate, API, UserService) {
            $scope.aaa = {"a":"bodyController"};
            $scope.lang = 'en';

            $rootScope.changeLanguage = $scope.changeLanguage = function (key) {
                console.log('lang =', key);
                $scope.lang = $rootScope.lang = key;
                $translate.use(key);
            };
        }
    ]
);