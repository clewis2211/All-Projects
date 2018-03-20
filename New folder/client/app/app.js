var myApp = angular.module("myApp", ["ngRoute"]);
myApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/home.html"
        })
        .when("/list", {
            templateUrl: "views/list.html",
        })
        .when("/single/:id", {
            templateUrl: "views/single.html"
        })
        .when("/user/:user", {
            templateUrl: "views/users.html"
        })

});
myApp.controller('allGetController', function ($scope, $http, $location, $routeParams) {
    $http.get("http://localhost:3000/api/chirps")
        .then(function (response) {
            $scope.allChirps = response.data
        })
    $scope.insertdata = function () {
        console.log('clicked')
        $http.post("http://localhost:3000/api/chirps", { 'user': $scope.user, 'message': $scope.message })
            .success(function (data, status, headers, config) {
                $scope.user = ''
                $scope.message = ''
                $http.get("http://localhost:3000/api/chirps")
                    .then(function (response) {
                        $scope.allChirps = response.data;
                    })
            });
    }
        $scope.deleteSingle = function (id) {
                //  console.log('dbl')
            // $location.path('/single/' + id)  
                // data=$params={
                //     user: $scope.user,
                //     message: $scope.message,
                //     id: $scope.id
                //  }
// console.log(data)
                // console.log(id)
        $http.delete('/api/chirps/' + id )
        .success(function (data, status, headers, config) {
                $http.get("http://localhost:3000/api/chirps")
                    .then(function (response) {
                        $scope.allChirps = response.data;
                    })
            });
            // .then(function () {
            //     $location.path('/single/' + id)
            //     id = ($location.path('/single/' + id))
            // })

         }
        // $scope.deleteSingle=function(id){}
    $scope.goToSingle = function (id) {
        $http.get('/api/chirps/')
            .then(function () {
                $location.path('/single/' + id)
                id = ($location.path('/single/' + id))
            })
    }
});
myApp.controller('oneController', function ($scope, $routeParams, $http) {
    var currentId = $routeParams.id;
    console.log(currentId)
    $http.get("http://localhost:3000/api/chirps/" + currentId)
        .then(function (response) {
            $scope.thisChirp = response.data;
            console.log(location.hash)
            console.log(response.data)
        })
});
   
    /* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}