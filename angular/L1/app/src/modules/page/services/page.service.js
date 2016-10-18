/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";
console.log("page/services/page.services.js loaded.");

app.factory(
    'PageService',
    [
        '$q','$http', 'API',
        function PageService($q, $http, API) {
            var service = {};

            service.test = function () {
                console.log("in pageService");
            };

            service.getPageList = function(){
                console.log("API.getApiURL('get_pages') = ", API.getApiURL('get_pages'));
                var defer = $q.defer();
                $http.get(API.getApiURL('get_pages')).then(
                    function (response) {
                        defer.resolve(response.data);
                    },
                    function (errResponse) {
                        defer.reject(errResponse);
                    }
                );
                return defer.promise;
            };

            return service;
        }
    ]
);