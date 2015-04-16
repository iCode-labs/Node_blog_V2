'use strict';

angular.module('Authentication', []);
angular.module('Main', []);

angular.module('blogManagePage', [
        'Authentication',
        'Main',
        'ngRoute',
        'ngCookies'
    ])
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/login', {
                    controller: 'LoginController',
                    templateUrl: '/admin/templates/login.html',
                    hideMenus: true
                })
                .when('/', {
                    controller: 'MainController',
                    templateUrl: '/admin/templates/main.html'
                })
                .otherwise({
                    redirectTo: '/login'
                });
        }
    ])
    .run(['$rootScope', '$location', '$cookieStore', '$http',
        function($rootScope, $location, $cookieStore, $http) {
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
            }
            $rootScope.$on('$locationChangeStart', function(event, next, current) {
                if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                    $location.path('/login');
                }
            });
        }
    ]);
