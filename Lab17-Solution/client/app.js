var app = angular.module('Chirper', ['ngRoute']);

//CONTROLLER FOR LIST.HTML
app.controller('ListController', ['$scope', '$http', function ($scope, $http) {
    //MAKE A GET REQUEST TO GET USERS
    $http.get("http://localhost:3000/api/users")
        .then(function (success) {
            //CREATE A $SCOPE VARIABLE TO STORE USERS
            $scope.users = success.data;
        }, console.log);
    //MAKE ANOTHER REQUEST TO GET CHIRPS
    $http.get("http://localhost:3000/api/chirps")
        .then(function (success) {
            //CREATE A $SCOPE VARIABLE TO STORE CHIRPS
            $scope.chirps = success.data;
        }, console.log);
    //FUNCTION TO GO TO A SINGLE CHIRP WHEN ONE IS CLICKED
    $scope.goToSingle = function(id) {
         window.location.href = "http://localhost:3000/#!/chirps/" + id;
    }
    //FUNCTION TO POST A NEW CHIRP WHEN BUTTON IS CLICKED
    $scope.postChirp = function() {
        var newChirp = {
            message: $scope.message,
            userId: $scope.userId
        };
        $http({
            method: "POST",
            url: "http://localhost:3000/api/chirps",
            data: newChirp
        }).then(function(success) {
            location.reload();
        }, console.log)
    }
}])

//CONTROLLER FOR SINGLE_VIEW.HTML
app.controller('SingleController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    //MAKE A GET REQUEST TO GET USERS
    $http.get("http://localhost:3000/api/users")
        .then(function (success) {
            //CREATE A $SCOPE VARIABLE TO STORE USERS
            $scope.users = success.data;
        }, console.log);
    //MAKE A GET REQUEST TO GET MY SINGLE CHIRP
    $http.get("http://localhost:3000/api/chirps/" + $routeParams.id)
        .then(function(success) {
            //CREATE A $SCOPE VARIABLE TO STORE SINGLE CHIRP
            $scope.chirp = success.data[0];
        }, console.log);    
    //DELETE CHIRP FUNCTION CALLED WHEN DELETE-BUTTON CLICKED
    $scope.deleteChirp = function() {
        $http.delete("http://localhost:3000/api/chirps/" + $routeParams.id)
            .then(function() {
                //GO BACK TO THE LIST IF THE DELETE WAS SUCCESSFUL 
                window.location.href = "http://localhost:3000/#!/chirps";
            }, console.log);
    }    
    //UPDATE CHIRP FUNCTION CALLED WHEN UPDATE-BUTTON CLICKED
    $scope.updateChirp = function() {
        //GO TO THE UPDATE PAGE 
        window.location.href = "http://localhost:3000/#!/chirps/" + $routeParams.id + "/update"; 
    }
}]);

//CONTROLLER FOR SINGLE_UPDATE.HTML
app.controller('UpdateController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    //MAKE A GET REQUEST TO GET USERS
    $http.get("http://localhost:3000/api/users")
        .then(function (success) {
            //CREATE A $SCOPE VARIABLE TO STORE USERS
            $scope.users = success.data;
        }, console.log);
    //MAKE A GET REQUEST TO GET MY SINGLE CHIRP
    $http.get("http://localhost:3000/api/chirps/" + $routeParams.id)
        .then(function(success) {
            //CREATE A $SCOPE VARIABLE TO STORE SINGLE CHIRP
            $scope.chirp = success.data[0];
            $scope.message = $scope.chirp.message;
        }, console.log);    
    //UPDATE CHIRP FUNCTION CALLED WHEN UPDATE BUTTON IS CLICKED
    $scope.updateChirp = function() {
        var newChirp = {
            message: $scope.message
        };
        $http({
            method: "PUT", 
            url: "http://localhost:3000/api/chirps/" + $routeParams.id,
            data: newChirp
        }).then(function(success) {
            window.location.href = "http://localhost:3000/#!/chirps/" + $routeParams.id;
        }, console.log)
    }
}]);

//SET UP ROUTING FOR OUR WEBPAGE
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/welcome.html'
    })
        .when('/chirps', {
            templateUrl: 'views/list.html',
            controller: 'ListController'
        })
        .when('/chirps/:id', {
            templateUrl: 'views/single_view.html',
            controller: 'SingleController'
        })
        .when('/chirps/:id/update', {
            templateUrl: 'views/single_update.html',
            controller: 'UpdateController'
        })
}]);