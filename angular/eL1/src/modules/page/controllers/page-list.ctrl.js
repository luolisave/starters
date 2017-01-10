/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";
console.log("page/controllers/page-list.ctrl.js loaded.");

app.controller('pageListController',
    ["$scope", "$stateParams","alertify", "PageService",
    function($scope, $stateParams, alertify, PageService) {
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


            // demo data
            PageService.getPageList().then(function(data){
                self.list = data;
            });


            self.deletePage = function(){
                alertify.confirm("Delete?", function () {
                    // user clicked "ok"
                }, function() {
                    // user clicked "cancel"
                });
            };


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