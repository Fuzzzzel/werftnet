/**
 * Created by Fuzzzzel on 17.07.2016.
 */

angular
    .module('app.core')
    .run(configure);

configure.$inject = ['editableOptions', '$rootScope', '$location', 'userService'];

function configure(editableOptions, $rootScope, $location, userService) {
    editableOptions.theme = 'bs3';

    // register listener to watch route changes
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (!userService.isLoggedIn()) {
            // no logged user, we should be going to #login
            if (next.templateUrl === "app/login.html") {
                // already going to #login, no redirect needed
            } else {
                // not going to #login, we should redirect now
                $location.path("/login");
            }
        }
    });

}

// Intercept responses to handle errors and display them on top
// of the page

angular
    .module('app.core')
    .config(config);

config.$inject = ['$httpProvider'];

function config($httpProvider) {
    // Intercept responses and handle result
    $httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
        return {
            'response': function(response) {
                // Handle responses < 300
                return response;
            },
            'responseError': function (errorResponse) {
                // Handle responses >= 300
                return $q.reject(errorResponse);
            }
        };
    }]);
}
