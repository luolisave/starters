/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";
console.log("main/controllers/pdf.ctrl.js loaded.");

app.controller('mainPdfController',
    ['$scope',
        function($scope) {
            $scope.aaa = {"a":"mainPdfController"};

            $scope.openPdf = function(pdfFileName){
                $scope.pdfFileName = pdfFileName;
                $('#pdfModal').modal('show');
                // setTimeout(function(){
                //     $('#pdfModal').modal('show');
                //     console.log("$('#pdfModal').modal('show');");
                // }, 100);
            };

        }
    ]
);