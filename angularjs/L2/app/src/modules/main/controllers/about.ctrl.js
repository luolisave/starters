/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";
console.log("main/controllers/about.js loaded.");

app.controller('mainAboutController',
    ['$scope',
        function($scope) {
            $scope.aaa = {"a":"mainAboutController"};



            tinymce.init({
                selector: '#areaEn',
                height: 500,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table contextmenu paste code'
                ],
                toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
            });

            tinymce.init({
                selector: '#areaFr',
                height: 500,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table contextmenu paste code'
                ],
                toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
            });







            $scope.getContents = function(){
                // Get content of a specific editor:
                console.log("tinyMCE.getContent('areaEn')", tinymce.get('areaEn').getContent());
                console.log("tinyMCE.getContent('areaFr')", tinymce.get('areaFr').getContent());
            };

            $scope.setContents = function(){
                // Set content of a specific editor:
                tinymce.get('areaEn').setContent('<p>Here we set html for <b>English</b> textarea</p>');
                tinymce.get('areaFr').setContent('<h3>Here we set html for <span style="color:blueviolet;">French</span> textarea</h3>');
            };


            $scope.$on('$destroy', function(){
                console.log("about controller scope destroyed.");
                tinymce.execCommand('mceRemoveEditor', true, 'areaEn');
                tinymce.execCommand('mceRemoveEditor', true, 'areaFr');
            });


        }
    ]
);