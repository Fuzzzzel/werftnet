/**
 * Created by Fuzzzzel on 27.08.2016.
 */

angular
    .module('app.freelancer')
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/freelancer/edit', {
                        templateUrl: 'app/freelancer/freelancer-edit.html',
                        controller: 'freelancerEditController as flEditCtrl'
                    }
                )
        }
    ]);