angular.module("FinalExam.controllers", [])

    .controller("ListController", ["$scope", "Book", function($scope, Book) {
        $scope.books = Book.query();
    }])
    
    .controller("SingleController", ["$scope", "Book", "$routeParams", function($scope, Book, $routeParams) {
        Book.get({id: $routeParams.id}, function(success) {
            $scope.book = success;
        })
    }]);