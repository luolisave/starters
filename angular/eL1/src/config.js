/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";
console.log("config.js loaded.");

liApp.config(['$routeProvider', '$stateProvider', '$urlRouterProvider', 
    function($routeProvider, $stateProvider, $urlRouterProvider){


        $stateProvider
            .state(
                'main',
                {
                    url:         '/main',
                    templateUrl: 'src/modules/main/templates/body.html',
                    controller:  'bodyController'
                }
            )
            .state(
                'main.home',
                {
                    url:         '/home',
                    templateUrl: 'src/modules/main/templates/home/home.html',
                    controller:  'mainHomeController'
                }
            )
        ;
        $urlRouterProvider.otherwise('/main/home');
    }
]);

$(document).ready(function(){
    console.log("dsafsafasfasdf");
   var liAppDiv = $("#liAppDiv");
   angular.bootstrap(liAppDiv, ['liApp']);
});

// setTimeout(function(){
//     console.log("bootstrap liApp");
//     angular.bootstrap(document, ['liApp']);
// }, 1000);
