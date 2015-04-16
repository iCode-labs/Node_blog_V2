'use strict';

angular.module('Authentication')
    .controller('LoginController', ['$scope', '$rootScope', '$location', 'AuthenticationService',
        function($scope, $rootScope, $location, AuthenticationService) {
            AuthenticationService.ClearCredentials();
            $scope.login = function() {
                $scope.dataLoading = true;
                AuthenticationService.Login($scope.email, $scope.password, function(response) {
                    if (response.isSuccess) {
                        AuthenticationService.SetCredentials($scope.email, $scope.password);
                        $location.path('/');
                    } else {
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                });
            };
        }
    ]);
