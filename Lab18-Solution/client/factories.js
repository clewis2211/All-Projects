//CREATE A NEW MODULE FOR OUR FACTORIES
var app = angular.module("Chirper.factories", []);

//CREATE A FACTORY THAT RETURNS A $RESOURCE FOR OUR CHIRP REQUESTS
app.factory('Chirp', ['$resource', function($resource) {
    return $resource("/api/chirps/:id", {id: "@id"}, {
        "update": {method: "PUT"},
        "get": {method: "GET", isArray: true}
    });
}]);

//CREATE A FACTORY THAT RETURNS A $RESOURCE FOR OUR USER REQUESTS
app.factory('User', ['$resource', function($resource) {
    return $resource("/api/users/:id", {id: "@id"});
}])