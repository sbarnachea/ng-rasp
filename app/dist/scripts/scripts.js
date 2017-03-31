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

(function() {
    'use strict';

    app.controller('homeController', homeController);

    function homeController($scope, $cookies, AuthenticationService, $location) {
      $scope.message = 'Hola, Mundo!';

      var vm = this;
      angular.extend(vm, {
          logout: logout
      });

      main();

      function main() {
        if ($cookies.authenticated == 'false') {
          $location.path("/login");
        }
      }

      function logout() {
        AuthenticationService.Logout();
      }
    }
})();

(function() {
    'use strict';

    app.controller('loginController', loginController);

    // loginController.$inject = ['$location', '$cookies'];

    function loginController($location, $cookies, AuthenticationService, $scope) {
        $scope.class_body = 'login';
      var vm = this;
      angular.extend(vm, {
          login: login
      });

      main();

      function main() {
        if ($cookies.authenticated == 'true') {
          $location.path("/");
        }
      }

      function login(username, password) {
        AuthenticationService.Login(username, password);
      }
    }
})();

(function() {
    'use strict';

    app.service('AuthenticationService', AuthenticationService);

    function AuthenticationService($cookies, $timeout, $location) {
        var service = {};

        service.Login = function (username, password) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            $timeout(function(){
                var user = {
                  username: username,
                  password: password
                };
                authenticate(user, function() {
                  if ($cookies.authenticated) {
                    $location.path("/");
                  } else {
                    $location.path("/login");
                  }
                });
            }, 1000);


            /* Use this for real authentication
             ----------------------------------------------*/
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        $cookies.authenticated = true;
            //        callback(response);
            //    });

        };

        service.Logout = function () {
            $cookies.authenticated = false;
            $location.path("/login");
        };

        function authenticate(credentials, callback) {
            if (credentials.username == 'sbarnachea') {
              $cookies.authenticated = true;
            } else {
              $cookies.authenticated = false;
            }
            callback && callback();
        }

        return service;
    }
})();
