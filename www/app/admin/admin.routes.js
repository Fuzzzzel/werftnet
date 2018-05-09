/**
 * Created by Fuzzzzel on 16.07.2016.
 */

angular
    .module('app.admin')
    .config(['$routeProvider',
        function routeProvider($routeProvider) {
            $routeProvider
                .when('/admin/anrede', {
                        templateUrl: './app/admin/defaults/anrede.html',
                        controller: 'adminController as adminCtrl'
                    }
                )
                .when('/admin/country', {
                        templateUrl: './app/admin/defaults/country.html',
                        controller: 'adminController as adminCtrl'
                    }
                )
                .when('/admin/sector', {
                        templateUrl: './app/admin/defaults/sector.html',
                        controller: 'adminController as adminCtrl'
                    }
                )
                .when('/admin/language', {
                        templateUrl: './app/admin/defaults/language.html',
                        controller: 'adminController as adminCtrl'
                    }
                )
                .when('/admin/service', {
                        templateUrl: './app/admin/defaults/service.html',
                        controller: 'adminController as adminCtrl'
                    }
                )
                .when('/admin/priceunit', {
                        templateUrl: './app/admin/defaults/priceunit.html',
                        controller: 'adminController as adminCtrl'
                    }
                )
                .when('/admin/currency', {
                        templateUrl: './app/admin/defaults/currency.html',
                        controller: 'adminController as adminCtrl'
                    }
                )
                .when('/admin/cattool', {
                        templateUrl: './app/admin/defaults/cattool.html',
                        controller: 'adminController as adminCtrl'
                    }
                )
                .when('/admin/flpaymenttype', {
                        templateUrl: './app/admin/defaults/flpaymenttype.html',
                        controller: 'adminController as adminCtrl'
                    }
                )
                .when('/admin/flinvoicingtype', {
                        templateUrl: './app/admin/defaults/flinvoicingtype.html',
                        controller: 'adminController as adminCtrl'
                    }
                )
                .when('/admin/flstatus', {
                        templateUrl: './app/admin/defaults/flstatus.html',
                        controller: 'adminController as adminCtrl'
                    }
                )
                .when('/admin/flrating', {
                        templateUrl: './app/admin/defaults/flrating.html',
                        controller: 'adminController as adminCtrl'
                    }
                )
                .when('/admin/custorigin', {
                        templateUrl: './app/admin/defaults/custorigin.html',
                        controller: 'adminController as adminCtrl'
                    }
                )
                .when('/admin/custpotential', {
                        templateUrl: './app/admin/defaults/custpotential.html',
                        controller: 'adminController as adminCtrl'
                    }
                )
                .when('/admin/custstatus', {
                        templateUrl: './app/admin/defaults/custstatus.html',
                        controller: 'adminController as adminCtrl'
                    }
                )
                .when('/admin/usermanagement', {
                        templateUrl: './app/admin/user/usermanagement.html',
                        controller: 'userAdminController as userAdminCtrl',
                        resolve: {
                            allUsers: function(dataService) {
                                return dataService.getAllUsers();
                            },
                            userRoles: function(dataService) {
                                return dataService.getUserRoles();
                            }
                        }
                    }
                );
        }
    ]);