/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";

app.config(['$routeProvider', '$stateProvider', '$urlRouterProvider', '$translateProvider',
    function($routeProvider, $stateProvider, $urlRouterProvider, $translateProvider){

        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('sanitize');
        // sanitize: sanitizes HTML in the translation text using $sanitize
        // escape: escapes HTML in the translation
        // sanitizeParameters: sanitizes HTML in the values of the interpolation parameters using $sanitize
        // escapeParameters: escapes HTML in the values of the interpolation parameters


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
            .state(
                'main.pdf',
                {
                    url:         '/pdf',
                    templateUrl: 'src/modules/main/templates/pdf/pdf.html',
                    controller:  'mainPdfController'
                }
            )
            .state(
                'main.about',
                {
                    url:         '/about',
                    templateUrl: 'src/modules/main/templates/about/about.html',
                    controller:  'mainAboutController'
                }
            )

            .state(
                'main.page',
                {
                    url:         '/page',
                    templateUrl: 'src/modules/page/templates/pages.tpl.html',
                    controller:  'pageController'
                }
            )
            .state(
                'main.page.list',
                {
                    url:         '/list',
                    templateUrl: 'src/modules/page/templates/pages-list.tpl.html',
                    controller:  'pageListController'
                }
            )
            .state(
                'main.page.edit',
                {
                    url:         '/edit/:pageId',
                    templateUrl: 'src/modules/page/templates/page-edit.tpl.html',
                    controller:  'pageController'
                }
            )
            .state(
                'main.page.create',
                {
                    url:         '/create',
                    templateUrl: 'src/modules/page/templates/page-create.tpl.html',
                    controller:  'pageController'
                }
            )
        ;
        $urlRouterProvider.otherwise('/main/home');
    }
]);

$(document).ready(function(){
   angular.bootstrap(document, ['liApp']);
});

// setTimeout(function(){
//     console.log("bootstrap liApp");
//     angular.bootstrap(document, ['liApp']);
// }, 1000);
