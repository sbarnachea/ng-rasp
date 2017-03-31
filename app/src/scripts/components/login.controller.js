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
