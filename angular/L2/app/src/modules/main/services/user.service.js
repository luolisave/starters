/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";
console.log("main/services/api.services.js loaded.");

app.factory(
    'UserService',
    [
        '$q','$http',
        function UserService($q, $http) {
            console.log("DEF UserService");
            var service = {};


            return service;
        }
    ]
);