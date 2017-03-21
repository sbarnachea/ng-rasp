/**
 * @name rasp-ng
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
