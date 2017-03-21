/**
 * @name dnc-pltaforma
 *
 * Main module of the application.
 */

var app = angular.module('ngrasp', ['ngRoute']).
    config(function($routeProvider) {
            $routeProvider
                .when('/', {
                        templateUrl : 'app/views/home.html',
                        controller  : 'homeController'
                })
                .otherwise({
                        redirectTo: '/'
                });
    });

app.controller('homeController', function($scope) {
    $scope.message = 'Hola, Mundo!';
});
