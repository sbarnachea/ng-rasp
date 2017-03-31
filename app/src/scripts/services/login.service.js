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
