/**
 * Created by Fuzzzzel on 17.07.2016.
 */

angular
    .module('app.shell')
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                        templateUrl: 'app/home.html'
                    }
                )
                .when('/login', {
                    templateUrl: 'app/login.html'
                })
                .when('/freelancer', {
                    templateUrl: 'app/freelancer/freelancer.html',
                    controller: 'freelancerController as flCtrl'
                })
                .when('/customer', {
                    templateUrl: 'app/customer/customer.html',
                    controller: 'customerController as custCtrl'
                })
                .when('/admin', {
                    templateUrl: 'app/admin/admin.html',
                    controller: 'adminController as adminCtrl'
                })
                .when('/user', {
                    templateUrl: 'app/user/user.html',
                    controller: 'userController as userCtrl'
                })
                .otherwise({redirectTo: '/'});

        }
    ]);