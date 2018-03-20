var app = angular.module('AngularBlog', ['ngRoute', 'ngResource', 'AngularBlog.factories', 'AngularBlog.controllers', 'AngularBlog.services', 'AngularBlog.directives']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    })
    .when('/compose', {
        templateUrl: 'views/compose.html',
        controller: 'ComposeController'
    })
    .when('/:id/update', {
        templateUrl: 'views/update.html',
        controller: 'UpdateController'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UserListController'
    })
    .when('/users/:id', {
        templateUrl: 'views/user_update.html',
        controller: 'UserUpdateController'
    })
    .when('/donations', {
        templateUrl: 'views/donations.html',
        controller: 'DonationController'
    })
    .when('/:id', {
        templateUrl: 'views/single.html',
        controller: 'SingleController'
    })
}])