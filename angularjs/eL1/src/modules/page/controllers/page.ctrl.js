/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";
console.log("page/controllers/page.ctrl.js loaded.");

app.controller('pageController',
    ["$scope", "$stateParams", "PageService",
    function($scope, $stateParams, PageService) {
        $scope.params = $stateParams;
        $scope.tinymceOptions = {
            onChange: function(e) {
                // put logic here for keypress and cut/paste changes
            },
            inline: false,
            plugins : 'advlist autolink link image lists charmap print preview',
            skin: 'lightgray',
            theme : 'modern',
            height: 300
        };

        function Page(){
            var self = this;
        }


        $scope.init = function(){
            $scope.page = new Page();

            $('#myTabs a').click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
        };
        $scope.init();
    }
]);