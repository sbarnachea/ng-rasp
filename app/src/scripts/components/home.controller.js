(function() {
    'use strict';

    app.controller('homeController', homeController);

    function homeController($scope) {
        $scope.message = 'Hola, Mundo!';
    }
})();
