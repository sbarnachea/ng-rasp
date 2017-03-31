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
