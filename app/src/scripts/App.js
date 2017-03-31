/**
 * @name rasp-ng
 */

var app = angular.module('ngrasp', ['ngRoute', 'ngCookies']).
    config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'app/views/home.html',
                controller  : 'homeController',
                controllerAs: 'hm'
            })
            .when('/login', {
                templateUrl : 'app/views/login.html',
                controller  : 'loginController',
                controllerAs: 'lg'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
