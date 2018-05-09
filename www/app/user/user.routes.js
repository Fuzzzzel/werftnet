/**
 * Created by Fuzzzzel on 17.07.2016.
 */

angular
    .module('app.shell')
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/user/profile', {
                    templateUrl: 'app/user/profile.html',
                    controller: 'userController as userCtrl'
                })
                .when('/user/changepwd', {
                    templateUrl: 'app/user/changepwd.html',
                    controller: 'userController as userCtrl'
                })
                .otherwise({redirectTo: '/'});

        }
    ]);