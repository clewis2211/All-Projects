angular.module('AngularBlog.directives', [])

    .directive('navbar', function() {
        return {
            templateUrl: "directives/navbar.html",
            restrict: "E"
            // scope: {
            //     something: "=HelloWorld"
            //     // goTo: function(name) {
            //     //     location.href = "http://localhost:3000/" + name;
            //     // }
            // }
        }
    });