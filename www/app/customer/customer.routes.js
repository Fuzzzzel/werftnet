/**
 * Created by Fuzzzzel on 10.09.2016.
 */

angular
    .module('app.customer')
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/customer/edit', {
                        templateUrl: 'app/customer/customer-edit.html',
                        controller: 'customerEditController as custEditCtrl'
                    }
                )
                .when('/customer/editContact', {
                        templateUrl: 'app/customer/contact-edit.html',
                        controller: 'customerContactEditController as contactEditCtrl'
                    }
                )
        }
    ]);