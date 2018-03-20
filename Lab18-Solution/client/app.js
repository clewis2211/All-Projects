var app = angular.module('Chirper', ['Chirper.factories', 'ngResource', 'ngRoute']);

//CONTROLLER FOR LIST.HTML
app.controller('ListController', ['$scope', 'Chirp', 'User', function ($scope, Chirp, User) {
    //MAKE A GET REQUEST TO GET USERS
    $scope.users = User.query();
    //MAKE ANOTHER REQUEST TO GET CHIRPS
    $scope.chirps = Chirp.query();
    //FUNCTION TO GO TO A SINGLE CHIRP WHEN ONE IS CLICKED
    $scope.goToSingle = function (id) {
        window.location.href = "http://localhost:3000/#!/chirps/" + id;
    }
    //FUNCTION TO POST A NEW CHIRP WHEN BUTTON IS CLICKED
    $scope.postChirp = function () {
        var newChirp = new Chirp({
            message: $scope.message,
            userId: $scope.userId
        });
        newChirp.$save(function (success) {
            $scope.chirps = Chirp.query();
            $scope.message = '';
            $scope.userId = '';
        });
    }
}])

//CONTROLLER FOR SINGLE_VIEW.HTML
app.controller('SingleController', ['$scope', 'Chirp', 'User', '$routeParams', function ($scope, Chirp, User, $routeParams) {
    //MAKE A GET REQUEST TO GET USERS
    $scope.users = User.query();
    //MAKE A GET REQUEST TO GET MY SINGLE CHIRP
    Chirp.get({ id: $routeParams.id }, function (success) {
        $scope.chirp = success[0];
    });
    //DELETE CHIRP FUNCTION CALLED WHEN DELETE-BUTTON CLICKED
    $scope.deleteChirp = function () {
        $scope.chirp.$delete(function (success) {
            //GO BACK TO THE LIST IF THE DELETE WAS SUCCESSFUL 
            window.location.href = "http://localhost:3000/#!/chirps";
        })
    }
    //UPDATE CHIRP FUNCTION CALLED WHEN UPDATE-BUTTON CLICKED
    $scope.updateChirp = function () {
        //GO TO THE UPDATE PAGE 
        window.location.href = "http://localhost:3000/#!/chirps/" + $routeParams.id + "/update";
    }
}]);

//CONTROLLER FOR SINGLE_UPDATE.HTML
app.controller('UpdateController', ['$scope', 'Chirp', 'User', '$routeParams', function ($scope, Chirp, User, $routeParams) {
        //MAKE A GET REQUEST TO GET USERS
    $scope.users = User.query();
    //MAKE A GET REQUEST TO GET MY SINGLE CHIRP
    Chirp.get({ id: $routeParams.id }, function (success) {
        $scope.chirp = success[0];
        $scope.message = $scope.chirp.message;
    });
    //UPDATE CHIRP FUNCTION CALLED WHEN UPDATE BUTTON IS CLICKED
    $scope.updateChirp = function () {
        //JUST CHANGE THE MESSAGE PROPERTY ON OUR CHIRP VARIABLE 
        $scope.chirp.message = $scope.message;
        //AND CALL $UPDATE TO PUT THE NEW CHIRP OBJECT WITH UPDATED MESSAGE
        $scope.chirp.$update(function(success) {
            window.location.href = "http://localhost:3000/#!/chirps/" + $routeParams.id;
        });
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