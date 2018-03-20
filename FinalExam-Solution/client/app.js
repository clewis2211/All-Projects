var app = angular.module("FinalExam", ["ngResource", "ngRoute", "FinalExam.controllers", "FinalExam.factories"]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
        templateUrl: 'views/books.html',
        controller: 'ListController'
    })
    .when("/:id", {
        templateUrl: "views/single.html",
        controller: "SingleController"
    })
}]);