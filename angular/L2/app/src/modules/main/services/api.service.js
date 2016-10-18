/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";
console.log("main/services/api.services.js loaded.");

app.factory(
    'API',
    [
        '$q','$http',
        function APIService($q, $http) {
            console.log("DEF APIService");
            var service = {};

            if(!service.APIs){
                $http.get("api.json").then(function(response){
                    service.APIs = response.data;
                    console.log("API api.json = ", service.APIs);
                });
            }



            service.getApiURL = function(api_string){
                if(service.APIs.env === "development"){
                    if(service.APIs && service.APIs.uri && service.APIs.uri[api_string]){
                        return service.APIs.uri[api_string];
                    }else{
                        return "";
                    }
                }else if(service.APIs.env === "uat"){
                    //TODO: uat
                }else if(service.APIs.env === "production"){
                    //TODO: production
                }

            };


            return service;
        }
    ]
);