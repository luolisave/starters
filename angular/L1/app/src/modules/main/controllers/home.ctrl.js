/**
 * Created by LLuo on 09/09/2016.
 */
"use strict";
console.log("main/controllers/home.js loaded.");

app.controller(
    'mainHomeController',
    ['$scope', 'alertify',
        function ($scope, alertify) {
            $scope.aaa = {"a": "mainHomeController"};

            // line chart
            $scope.lineChart = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                series: ['Series A', 'Series B'],
                data: [
                    [65, 59, 80, 81, 56, 55, 40],
                    [28, 48, 40, 19, 86, 27, 90]
                ],
                onClick: function (points, evt) {
                    console.log(points, evt);
                },
                datasetOverride: [{yAxisID: 'y-axis-1'}, {yAxisID: 'y-axis-2'}],
                options: {
                    scales: {
                        yAxes: [
                            {
                                id: 'y-axis-1',
                                type: 'linear',
                                display: true,
                                position: 'left'
                            },
                            {
                                id: 'y-axis-2',
                                type: 'linear',
                                display: true,
                                position: 'right'
                            }
                        ]
                    }
                }
            };


            // bar chart
            $scope.barChart = {
                labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
                series: ['Series A', 'Series B'],
                data: [
                    [65, 59, 80, 81, 56, 55, 40],
                    [28, 48, 40, 19, 86, 27, 90]
                ]
            };

            // dun chart
            $scope.doughnutChart = {
                labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
                data: [300, 500, 100]
            };

            // pie chart
            $scope.pieChart = {
                labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
                data: [300, 500, 100]
            };

            //===========================================================
            //alert('aaa');
            //alertify.success('Hello world!');
            //alertify.alert("Successful AJAX after OK");
            // alertify.confirm("Message", function () {
            //     // user clicked "ok"
            // }, function() {
            //     // user clicked "cancel"
            // });
        }
    ]
);