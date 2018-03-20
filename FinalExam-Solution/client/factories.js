angular.module("FinalExam.factories", [])

    .factory("Book", ['$resource', function($resource) {
        return $resource("http://localhost:3000/api/books/:id", {id: "@id"});
    }]);